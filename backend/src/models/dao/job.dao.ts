export interface JobDaoInterface {
    id: number;
    name: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}