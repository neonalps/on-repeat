export interface AccountTokenApiDto {
    publicId: string;
    provider: string;
    scopes: string[];
    createdAt: Date;
}