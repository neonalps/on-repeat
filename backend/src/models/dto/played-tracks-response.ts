interface PlayedTracksResponse {
    playedTracks: PlayedTrackDto[];
    next: string;
    cursors: CursorInfo;
    limit: number;
    href: string;
}