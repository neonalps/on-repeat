export interface AccountTokenDaoInterface {
    id: number;
    publicId: string;
    accountId: number;
    oauthProvider: string;
    scope: string;
    encryptedAccessToken: string;
    accessTokenExpiresAt: Date;
    encryptedRefreshToken: string;
    createdAt: Date;
    updatedAt: Date | null;
}