export interface AccountJobDaoInterface {
    id: number;
    accountId: number;
    jobId: number;
    intervalSeconds: number;
    failureCount: number;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}