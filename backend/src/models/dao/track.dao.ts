interface TrackDaoInterface {
    id: number;
    name: string;
    albumId: number | null;
    isrc: string | null;
    discNumber: number | null;
    durationMs: number | null;
    createdAt: Date;
}