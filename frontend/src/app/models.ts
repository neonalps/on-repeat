export interface AuthUser {
    userId: string;
    username: string | null;
    email: string;
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string | null;
}

export interface OAuthConfig {
    authorizeUrl: string;
    clientId: string;
    redirectUri: string;
}

export interface LoginResponseDto {
    identity: {
        displayName: string | null;
        email: string;
        publicId: string;
    }
    token: {
        accessToken: string;
    }
}