export interface AccountJobScheduleApiDto {
    publicId: string;
    state: string;
    createdAt: Date;
    scheduledAfter: Date;
    scheduledAt?: Date;
    startedAt?: Date;
    finishedAt?: Date;
    errorMessage?: string
}