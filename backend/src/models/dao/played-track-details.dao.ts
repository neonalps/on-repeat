export interface PlayedTrackDetailsDaoInterface {
    playedTrackId: number;
    trackId: number;
    trackName: string;
    albumId: number;
    albumName: string;
    artistId: number;
    artistName: string;
    musicProviderId: number;
    musicProviderName: string;
    playedAt: Date;
    includeInStatistics: boolean;
}