export interface AccountJobScheduleDaoInterface {
    id: number;
    publicId: string;
    accountJobId: number;
    state: string;
    scheduledAfter: Date;
    scheduledAt: Date | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    errorMessage: string | null;
    createdAt: Date;
}