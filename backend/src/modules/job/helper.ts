import { CreateAccountJobDto } from "@src/models/classes/dto/create-account-job";
import { AccountJobScheduleService } from "@src/modules/account-jobs-schedules/service";
import { AccountJobService } from "@src/modules/account-jobs/service";
import { requireNonNull } from "@src/util/common";
import { TimeSource } from "@src/util/time";
import { validateNotNull } from "@src/util/validation";
import { JobService } from "@src/modules/job/service";
import { JobExecutionContext } from "@src/modules/scheduler/scheduler";
import { AccountJobScheduleDao } from "@src/models/classes/dao/account-job-schedule";
import { AccountJobDao } from "@src/models/classes/dao/account-job";
import { AccountService } from "@src/modules/account/service";

export class JobHelper {

    public static readonly JOB_ID_FETCH_SPOTIFY_RECENT_PLAYED_TRACKS = 1;

    static readonly ERROR_CREATE_ACCOUNT_JOB = "Failed to create account job";
    static readonly ERROR_CREATE_ACCOUNT_JOB_SCHEDULE = "Failed to create account job schedule";
    static readonly ERROR_ACCOUNT_DISABLED = "Account is disabled";
    static readonly ERROR_JOB_DISABLED_GLOBALLY = "Job has been disabled globally";
    static readonly ERROR_JOB_DISABLED_ACCOUNT = "Job has been disabled for this account";

    private static readonly MAXIMUM_FAILURE_COUNT = 5;
    private static readonly BATCH_SIZE = 10;

    private readonly accountService: AccountService;
    private readonly jobService: JobService;
    private readonly accountJobService: AccountJobService;
    private readonly accountJobScheduleService: AccountJobScheduleService;
    private readonly timeSource: TimeSource;

    constructor(
        accountService: AccountService,
        jobService: JobService,
        accountJobService: AccountJobService, 
        accountJobScheduleService: AccountJobScheduleService, 
        timeSource: TimeSource,
    ) {
        this.accountService = requireNonNull(accountService);
        this.jobService = requireNonNull(jobService);
        this.accountJobService = requireNonNull(accountJobService);
        this.accountJobScheduleService = requireNonNull(accountJobScheduleService);
        this.timeSource = requireNonNull(timeSource);
    }

    public async insertInitialAccountJobScheduleSpotifyRecentlyPlayedTracks(accountId: number): Promise<void> {
        await this.insertInitialAccountJobSchedule(accountId, JobHelper.JOB_ID_FETCH_SPOTIFY_RECENT_PLAYED_TRACKS);
    }

    private async insertInitialAccountJobSchedule(accountId: number, jobId: number): Promise<void> {
        validateNotNull(accountId, "accountId");
        validateNotNull(jobId, "jobId");

        const job = await this.jobService.getById(jobId);
        if (!job) {
            throw new Error(`Job with ID ${jobId} does not exist`);
        }

        const createAccountJob = CreateAccountJobDto.Builder
            .withAccountId(accountId)
            .withJobId(job.id)
            .withIntervalSeconds(job.intervalMs / 1000)
            .withEnabled(true)
            .build();

        const accountJob = await this.accountJobService.create(createAccountJob);
        if (!accountJob) {
            throw new Error(JobHelper.ERROR_CREATE_ACCOUNT_JOB);
        }

        const initialScheduleAfter = this.timeSource.getNowPlusMilliSeconds(job.initialDelayMs);
        const accountJobSchedule = await this.accountJobScheduleService.create(accountJob.id, initialScheduleAfter);
        if (!accountJobSchedule) {
            throw new Error(JobHelper.ERROR_CREATE_ACCOUNT_JOB_SCHEDULE);
        }
    }

    public async isJobProcessingEnabled(): Promise<boolean> {
        return true;
    }

    public async getConfiguredBatchSize(): Promise<number> {
        return JobHelper.BATCH_SIZE;
    }

    public async getConfiguredMaximumFailureCount(): Promise<number> {
        return JobHelper.MAXIMUM_FAILURE_COUNT;
    }

    public async scheduleBatch(batchSize: number): Promise<Set<number>> {
        return this.accountJobScheduleService.scheduleBatch(batchSize);
    }

    public async buildJobExecutionContext(scheduleId: number): Promise<JobExecutionContext | null> {
        const accountJobSchedule = await this.accountJobScheduleService.getById(scheduleId);
        if (accountJobSchedule === null) {
            return null;
        }

        const accountJob = await this.accountJobService.getById(accountJobSchedule.accountJobId);
        if (accountJob === null) {
            return null;
        }

        const account = await this.accountService.getById(accountJob.accountId);
        if (account === null) {
            return null;
        }

        const job = await this.jobService.getById(accountJob.jobId);
        if (job === null) {
            return null;
        }

        return {
            account,
            job,
            accountJob,
            accountJobSchedule,
        }
    }

    public checkJobEnabled(context: JobExecutionContext): string | null {
        if (context.account.enabled !== true) {
            return JobHelper.ERROR_ACCOUNT_DISABLED;
        }

        if (context.job.enabled !== true) {
            return JobHelper.ERROR_JOB_DISABLED_GLOBALLY;
        }

        if (context.accountJob.enabled !== true) {
            return JobHelper.ERROR_JOB_DISABLED_ACCOUNT;
        }

        return null;
    }

    public async markStarted(scheduleId: number): Promise<void> {
        await this.accountJobScheduleService.markStarted(scheduleId);
    }

    public async markSucceeded(accountJob: AccountJobDao, accountJobSchedule: AccountJobScheduleDao): Promise<void> {
        const accountJobId = accountJob.id;
        const scheduleId = accountJobSchedule.id;

        await this.accountJobScheduleService.markSucceeded(scheduleId);

        if (accountJob.failureCount > 0) {
            await this.accountJobService.resetFailureCount(accountJobId);
        }

        const nextJobExecutionAfter = await this.determineNextJobExecution(scheduleId, accountJob.intervalSeconds);
        await this.accountJobScheduleService.create(accountJobId, nextJobExecutionAfter);
    }

    public async markFailed(accountJob: AccountJobDao, accountJobSchedule: AccountJobScheduleDao, reason: string): Promise<void> {
        const accountJobId = accountJob.id;
        const scheduleId = accountJobSchedule.id;

        await Promise.all([
            this.accountJobService.increaseFailureCount(accountJobId),
            this.accountJobScheduleService.markFailed(scheduleId, reason),
        ]);

        const accountJobFailureCount = await this.getAccountJobFailureCount(accountJobId);

        if (accountJobFailureCount >= await this.getConfiguredMaximumFailureCount()) {
            await this.accountJobService.disableAccountJob(accountJobId);
            return;
        }

        const nextJobExecutionAfter = await this.determineNextJobExecution(scheduleId, accountJob.intervalSeconds);
        await this.accountJobScheduleService.create(accountJobId, nextJobExecutionAfter);
    }

    public async markJobInstanceFailed(scheduleId: number, reason: string): Promise<void> {
        await this.accountJobScheduleService.markFailed(scheduleId, reason);
    }

    private async getAccountJobFailureCount(accountJobId: number): Promise<number> {
        const accountJob = await this.accountJobService.getById(accountJobId);
        if (accountJob === null) {
            return JobHelper.MAXIMUM_FAILURE_COUNT;
        }

        return accountJob.failureCount;
    }

    private async determineNextJobExecution(scheduleId: number, intervalSeconds: number): Promise<Date> {
        const schedule = await this.accountJobScheduleService.getById(scheduleId) as AccountJobScheduleDao;
        const scheduledAt = schedule.scheduledAt;

        const baseDate = scheduledAt !== null ? scheduledAt : this.timeSource.getNow();
        return this.timeSource.addSeconds(baseDate, intervalSeconds);
    }

}