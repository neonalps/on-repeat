interface CreateAccountTokenDto {
    accountId: string;
    oauthProvider: string;
    scope: string;
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
}