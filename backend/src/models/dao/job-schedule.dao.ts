export interface JobScheduleDao {
    id: number;
    jobId: number;
    state: string;
    scheduledAfter: Date;
    startedAt: Date | null;
    finishedAt: Date | null;
    errorMessage: string | null;
    createdAt: Date;
}