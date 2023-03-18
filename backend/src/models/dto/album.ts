interface AlbumDto {
    id: string;
    name: string;
    albumGroup: string;
    albumType: string;
    artists: ArtistDto[];
    externalUrls: Record<string, string>;
    href: string;
    images: Image[];
    isPlayable: boolean;
    releaseDate: Date | null;
    releaseDatePrecision: string;
    totalTracks: number;
    type: string;
    uri: string;
}