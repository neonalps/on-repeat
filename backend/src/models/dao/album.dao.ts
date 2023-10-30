export interface AlbumDaoInterface {
    id: number;
    name: string;
    albumType: string | null;
    albumGroup: string | null;
    totalTracks: number | null;
    releaseDate: Date | null;
    releaseDatePrecision: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}