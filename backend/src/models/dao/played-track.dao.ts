export interface PlayedTrackDaoInterface {
    id: number;
    accountId: number;
    trackId: number;
    musicProviderId: number;
    playedAt: Date;
    includeInStatistics: boolean;
    createdAt: Date;
}