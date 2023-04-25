interface AccountDaoInterface {
    id: number;
    publicId: string;
    hashedEmail: string;
    encryptedEmail: string | null;
    enabled: boolean;
    createdAt: Date;
}