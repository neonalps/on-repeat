export interface OauthLoginRequestDto {
    provider: string;
    code: string;
    state: string;
}