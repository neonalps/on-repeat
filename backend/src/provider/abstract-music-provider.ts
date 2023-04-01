abstract class MusicProvider {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    abstract processPlayedTracks(userId: number, playedTracks: PlayedTrackDto[]): Promise<void>;
    abstract getTrackIdByProviderTrackId(providerTrackId: string): Promise<number | null>;
    abstract getArtistIdByProviderArtistId(providerArtistId: string): Promise<number | null>;
    abstract getAlbumIdByProviderAlbumId(providerAlbumId: string): Promise<number | null>;
    abstract addTrackIdAndTrackProviderTrackIdRelation(trackId: number, providerTrackId: string): Promise<void>;
    abstract addArtistIdAndTrackProviderArtistIdRelation(artistId: number, providerArtistId: string): Promise<void>;
    abstract addAlbumIdAndTrackProviderAlbumIdRelation(albumId: number, providerAlbumId: string): Promise<void>;
}