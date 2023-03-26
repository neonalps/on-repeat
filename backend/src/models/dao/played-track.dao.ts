interface PlayedTrackDaoInterface {
    id: number;
    accountId: number;
    trackId: number;
    musicProviderId: number;
    playedAt: Date;
    createdAt: Date;
}