interface RecentlyPlayedTracksResponseDto {
    items: SpotifyPlayedTrackDto[],
    next: string;
    cursors: CursorInfo;
    limit: number;
    href: string;
}