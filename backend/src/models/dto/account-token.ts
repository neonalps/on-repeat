export interface AccountToken {
    id: number;
    accountId: string;
    oauthProvider: string;
    scope: string;
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date | null;
}