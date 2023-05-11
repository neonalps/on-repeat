export interface ConnectSpotifyRequestDto {
    code: string;
    state: string;
    createFetchRecentlyPlayedTracksJob: boolean;
}