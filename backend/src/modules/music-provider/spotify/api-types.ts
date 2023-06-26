export interface SpotifyRecentlyPlayedTracksResponseDto {
    items: SpotifyPlayedTrackDto[];
    next: string;
    cursors: SpotifyCursorDto;
    limit: number;
    href: string;
}

export interface SpotifyRecentlyPlayedTracksApiResponseDto {
    items: SpotifyPlayedTrackApiDto[];
    next: string;
    cursors: SpotifyCursorApiDto;
    limit: number;
    href: string;
}

export interface SpotifySeveralArtistDetailsApiResponseDto {
    artists: SpotifyArtistDetailsApiDto[];
}

export interface SpotifyCursorApiDto {
    after: string;
    before: string;
}

export interface SpotifyCursorDto {
    after: string;
    before: string;
}

export interface SpotifyPlayedTrackApiDto {
    track: SpotifyTrackApiDto;
    played_at: string;
}

export interface SpotifyPlayedTrackDto {
    track: SpotifyTrackDto;
    playedAt: Date;
}

export interface SpotifyArtistApiDto {
    id: string;
    name: string;
    type: string;
    uri: string;
    href: string;
    external_urls: Record<string, string>;
}

export interface SpotifyArtistDto {
    id: string;
    name: string;
    type: string;
    uri: string;
    href: string;
    externalUrls: Record<string, string>;
}

export interface SpotifyTrackApiDto {
    album: SpotifyAlbumApiDto;
    artists: SpotifyArtistApiDto[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: Record<string, string>;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export interface SpotifyTrackDto {
    album: SpotifyAlbumDto;
    artists: SpotifyArtistDto[];
    availableMarkets: string[];
    discNumber: number;
    durationMs: number;
    explicit: boolean;
    externalIds: Record<string, string>;
    externalUrls: Record<string, string>;
    href: string;
    id: string;
    isLocal: boolean;
    name: string;
    popularity: number;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
}

export interface SpotifyAlbumApiDto {
    album_group: string;
    album_type: string;
    artists: SpotifyArtistApiDto[];
    available_markets: string[];
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: SpotifyImageApiDto[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface SpotifyAlbumDto {
    albumGroup: string;
    albumType: string;
    artists: SpotifyArtistDto[];
    availableMarkets: string[];
    externalUrls: Record<string, string>;
    href: string;
    id: string;
    images: SpotifyImageDto[];
    isPlayable: boolean;
    name: string;
    releaseDate: Date;
    releaseDatePrecision: string;
    totalTracks: number;
    type: string;
    uri: string;
}

export interface SpotifyImageApiDto {
    height: number;
    url: string;
    width: number;
}

export interface SpotifyImageDto {
    height: number;
    url: string;
    width: number;
}

export interface SpotifyFollowerInfoApiDto {
    href: string | null;
    total: number;
}

export interface SpotifyFollowerInfoDto {
    href: string | null;
    total: number;
}

export interface SpotifyArtistDetailsApiDto {
    external_urls: Record<string, string>;
    followers: SpotifyFollowerInfoApiDto;
    genres: string[];
    href: string;
    id: string;
    images: SpotifyImageApiDto[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface SpotifyArtistDetailsDto {
    externalUrls: Record<string, string>;
    followers: SpotifyFollowerInfoDto;
    genres: string[];
    href: string;
    id: string;
    images: SpotifyImageDto[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}