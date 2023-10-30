export interface CreateAccountTokenRequestDto {
    provider: string;
    code: string;
    state: string;
    createFetchRecentlyPlayedTracksJob: boolean;
}