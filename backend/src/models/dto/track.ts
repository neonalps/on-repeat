interface TrackDto {
    id: string;
    name: string;
    artists: ArtistDto[];
    album: AlbumDto;
    durationMs: number;
    explicit: boolean;
    href: string;
    discNumber: number;
    externalIds: Record<string, string>;
    externalUrls: Record<string, string>;
}