export interface AccountTokenDaoInterface {
    id: number;
    accountId: number;
    oauthProvider: string;
    scope: string;
    encryptedAccessToken: string;
    accessTokenExpiresAt: Date;
    encryptedRefreshToken: string;
    createdAt: Date;
    updatedAt: Date | null;
}