export interface RefreshTokenResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    scope: string;
}