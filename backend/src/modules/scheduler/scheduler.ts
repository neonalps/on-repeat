import { AccountJobDao } from '@src/models/classes/dao/account-job';
import { AccountJobScheduleDao } from '@src/models/classes/dao/account-job-schedule';
import { JobDao } from '@src/models/classes/dao/job';
import { requireNonNull } from '@src/util/common';
import { JobRepository } from '@src/modules/job/repository';
import { JobHelper } from '@src/modules/job/helper';
import logger from '@src/log/logger';
import { AccountDao } from '@src/models/classes/dao/account';

export interface JobExecutionContext {
    account: AccountDao;
    job: JobDao;
    accountJob: AccountJobDao;
    accountJobSchedule: AccountJobScheduleDao;
}

export class Scheduler {

    static readonly ERROR_CONTEXT_NULL = "Job execution context is null";

    private static readonly SCHEDULE_INTERVAL_SECONDS = 10;

    private readonly jobHelper: JobHelper;

    constructor(jobHelper: JobHelper) {
        this.jobHelper = requireNonNull(jobHelper);
    }

    public async run(): Promise<void> {
        this.schedule();
        this.scheduleNextRun();
    }

    private scheduleNextRun(): void {
        setTimeout(() => {
            this.schedule();
            this.scheduleNextRun();
        }, Scheduler.SCHEDULE_INTERVAL_SECONDS * 1000);
    }

    private async schedule(): Promise<void> {
        const isSchedulingEnabled = await this.jobHelper.isJobProcessingEnabled();
        if (!isSchedulingEnabled) {
            return;
        }

        const batchSize = await this.jobHelper.getConfiguredBatchSize();
        const scheduledAccountJobIds = await this.jobHelper.scheduleBatch(batchSize);

        for (const scheduleId of scheduledAccountJobIds) {
            const executionContext = await this.jobHelper.buildJobExecutionContext(scheduleId);
            if (executionContext === null) {
                logger.error(`Job ${scheduleId} not executed because execution context is null`);
                this.jobHelper.markJobInstanceFailed(scheduleId, Scheduler.ERROR_CONTEXT_NULL);
                continue;
            }

            const jobDisabledReason = this.jobHelper.checkJobEnabled(executionContext);
            if (jobDisabledReason !== null) {
                this.jobHelper.markFailed(executionContext.accountJob, executionContext.accountJobSchedule, jobDisabledReason);
                return;
            }

            await this.processSafely(executionContext);   
        }
    }

    private async processSafely(context: JobExecutionContext): Promise<void> {
        try {
            await this.jobHelper.markStarted(context.accountJobSchedule.id);
            await JobRepository.getJob(context.job.id).process(context);
            await this.jobHelper.markSucceeded(context.accountJob, context.accountJobSchedule);
        } catch (ex) {
            await this.jobHelper.markFailed(context.accountJob, context.accountJobSchedule, (ex as any)?.message);
        }
    }

}