interface CreateJobDto {
    name: string;
    accountId: string;
    intervalSeconds: number;
    enabled: boolean;
}