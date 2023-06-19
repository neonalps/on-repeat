export interface JobDaoInterface {
    id: number;
    name: string;
    enabled: boolean;
    intervalMs: number;
    initialDelayMs: number;
    createdAt: Date;
    updatedAt: Date | null;
}