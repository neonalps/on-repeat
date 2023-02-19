interface JobDao {
    id: number;
    name: string;
    accountId: string;
    intervalSeconds: number;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}