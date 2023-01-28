interface OauthClient {
    id: number;
    name: string;
    clientId: string;
    clientSecret: string;
    grantType: string;
    scope: string;
    authorizeUrl: string;
    authorizeRedirectUrl: string;
    refreshTokenUrl: string;
    stateProvider: string;
}