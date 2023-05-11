export interface MusicProviderAlbumDaoInterface {
    id: number;
    musicProviderId: number;
    albumId: number;
    musicProviderAlbumId: string;
    musicProviderAlbumUri: string | null;
    createdAt: Date;
}