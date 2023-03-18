interface SpotifyAlbumDto {
    album_group: string;
    album_type: string;
    artists: SpotifyArtistDto[];
    available_markets: string[];
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: SpotifyImage[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}