export interface AccountDaoInterface {
    id: number;
    publicId: string;
    displayName: string;
    hashedEmail: string;
    encryptedEmail: string | null;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}