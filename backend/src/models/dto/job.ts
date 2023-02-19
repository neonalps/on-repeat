interface Job {
    id: number;
    name: string;
    account: User;
    intervalSeconds: number;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}