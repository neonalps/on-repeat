interface AuthProvider {
    getId: () => string;
    getName: () => string;
    getOauthConfiguration: () => unknown;
    getAuthorizeUrl: () => string;
    handleOauthCallback: (queryParams: unknown) => unknown;
    handleTokenRefresh: (refreshToken: string) => unknown;
}