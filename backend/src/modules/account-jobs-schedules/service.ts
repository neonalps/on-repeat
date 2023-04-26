import { requireNonNull } from "@src/util/common";
import { AccountJobScheduleMapper } from "./mapper";
import { CreateAccountJobScheduleDto } from "@src/models/classes/dto/create-account-job-schedule";
import { AccountJobScheduleDao } from "@src/models/classes/dao/account-job-schedule";
import { validateNotNull } from "@src/util/validation";
import { JobStatus } from "@src/models/enum/job-status";
import { UuidSource } from "@src/util/uuid";

export class AccountJobScheduleService {

    private readonly mapper: AccountJobScheduleMapper;
    private readonly uuidSource: UuidSource;

    constructor(mapper: AccountJobScheduleMapper, uuidSource: UuidSource) {
        this.mapper = requireNonNull(mapper);
        this.uuidSource = requireNonNull(uuidSource);
    }

    public async createNewJobSchedule(accountJobId: number, scheduledAfter: Date): Promise<AccountJobScheduleDao | null> {
        validateNotNull(accountJobId, "accountJobId");
        validateNotNull(scheduledAfter, "scheduledAfter");

        const dto = CreateAccountJobScheduleDto.Builder
            .withPublicId(this.uuidSource.getRandomUuid())
            .withAccountJobId(accountJobId)
            .withState(JobStatus.READY.toString())
            .withScheduledAfter(scheduledAfter)
            .withStartedAt(null)
            .withFinishedAt(null)
            .withErrorMessage(null)
            .build();
    
        const scheduleId = await this.mapper.create(dto);
    
        if (!scheduleId) {
            throw new Error("Failed to create account job schedule");
        }
    
        return this.getById(scheduleId);
    }

    public async getById(id: number): Promise<AccountJobScheduleDao | null> {
        validateNotNull(id, "id");

        return this.mapper.getById(id);
    }

    public async markScheduled(scheduleId: number): Promise<void> {
        validateNotNull(scheduleId, "scheduleId");

        await this.mapper.markScheduled(scheduleId, JobStatus.SCHEDULED.toString());
    }

    public async markBatchScheduled(scheduleIds: Set<number>): Promise<void> {
        validateNotNull(scheduleIds, "scheduleIds");

        await this.mapper.markBatchScheduled(scheduleIds, JobStatus.SCHEDULED.toString());
    }

    public async markStarted(scheduleId: number): Promise<void> {
        validateNotNull(scheduleId, "scheduleId");

        await this.mapper.markStarted(scheduleId, JobStatus.STARTED.toString());
    }

    public async markSucceeded(scheduleId: number): Promise<void> {
        validateNotNull(scheduleId, "scheduleId");

        await this.mapper.markFinished(scheduleId, JobStatus.SUCEEDED.toString(), null);
    }

    public async markFailed(scheduleId: number, errorMessage: string): Promise<void> {
        validateNotNull(scheduleId, "scheduleId");

        await this.mapper.markFinished(scheduleId, JobStatus.FAILED.toString(), errorMessage);
    }

}