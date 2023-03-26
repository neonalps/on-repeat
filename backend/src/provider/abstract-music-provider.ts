abstract class MusicProvider {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    abstract processPlayedTracks(userId: number, playedTracks: PlayedTrackDto[]): Promise<void>;
    abstract getTrackByProviderTrackId(providerTrackId: string): Promise<Track | null>;
    abstract getArtistByProviderArtistId(providerArtistId: string): Promise<Artist | null>;
    abstract getAlbumByProviderAlbumId(providerAlbumId: string): Promise<Album | null>;
    abstract addTrackAndTrackProviderTrackIdRelation(trackId: number, providerTrackId: string): Promise<void>;
    abstract addArtistAndTrackProviderArtistIdRelation(artistId: number, providerArtistId: string): Promise<void>;
    abstract addAlbumAndTrackProviderAlbumIdRelation(albumId: number, providerAlbumId: string): Promise<void>;
}