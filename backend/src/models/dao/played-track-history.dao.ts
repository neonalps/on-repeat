export interface PlayedTrackHistoryDaoInterface {
    playedTrackId: number;
    playedAt: Date;
    musicProviderId: number;
    musicProviderName: string;
    includeInStatistics: boolean;
}