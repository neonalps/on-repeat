interface AlbumDaoInterface {
    id: number;
    name: string;
    type: string;
    albumType: string;
    albumGroup: string;
    releaseDate: Date | null;
    releaseDatePrecision: string | null;
    createdAt: Date;
}