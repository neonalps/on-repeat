export interface MusicProviderTrackDaoInterface {
    id: number;
    musicProviderId: number;
    trackId: number;
    musicProviderTrackId: string;
    musicProviderTrackUri: string | null;
    createdAt: Date;
}