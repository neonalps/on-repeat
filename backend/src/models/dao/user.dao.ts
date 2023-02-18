interface UserDao {
    id: string;
    hashedEmail: string;
    encryptedEmail: string | null;
    enabled: boolean;
    createdAt: Date;
}