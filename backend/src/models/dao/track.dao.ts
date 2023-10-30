export interface TrackDaoInterface {
    id: number;
    name: string;
    albumId: number | null;
    isrc: string | null;
    bucket: number;
    href: string | null;
    discNumber: number | null;
    trackNumber: number | null;
    durationMs: number | null;
    explicit: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
}