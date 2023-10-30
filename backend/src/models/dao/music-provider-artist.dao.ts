export interface MusicProviderArtistDaoInterface {
    id: number;
    musicProviderId: number;
    artistId: number;
    musicProviderArtistId: string;
    musicProviderArtistUri: string | null;
    createdAt: Date;
}