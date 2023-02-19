interface JobSchedule {
    id: number;
    job: Job;
    state: string;
    scheduledAfter: Date;
    startedAt: Date | null;
    finishedAt: Date | null;
    errorMessage: string | null;
    createdAt: Date;
}