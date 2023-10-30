export interface RetrieveOauthTokenDto {
    provider: string;
    code: string;
    state: string;
}