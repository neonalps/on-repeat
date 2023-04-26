import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { MusicProviderMapper } from "./mapper";
import { requireNonNull } from "@src/util/common";

export abstract class MusicProvider {
    protected readonly providerId: number;
    protected readonly providerName: string;
    protected readonly mapper: MusicProviderMapper;

    constructor(id: number, name: string, mapper: MusicProviderMapper) {
        this.providerId = requireNonNull(id);
        this.providerName = requireNonNull(name);
        this.mapper = requireNonNull(mapper);
    }

    public abstract processPlayedTracks(accountId: number, playedTracks: PlayedTrackDto[]): Promise<void>;

    public getTrackByProviderTrackId(providerTrackId: string): Promise<MusicProviderTrackDao | null> {
        validateNotBlank(providerTrackId, "providerTrackId");

        return this.mapper.getTrackByProviderTrackId(this.providerId, providerTrackId);
    }

    public getArtistByProviderArtistId(providerArtistId: string): Promise<MusicProviderArtistDao | null> {
        validateNotBlank(providerArtistId, "providerArtistId");

        return this.mapper.getArtistByProviderArtistId(this.providerId, providerArtistId);
    }

    public getAlbumIdByProviderAlbumId(providerAlbumId: string): Promise<MusicProviderAlbumDao | null> {
        validateNotBlank(providerAlbumId, "providerAlbumId");

        return this.mapper.getAlbumByProviderAlbumId(this.providerId, providerAlbumId);
    }

    public addMusicProviderTrackRelation(trackId: number, musicProviderTrackId: string, musicProviderTrackUri: string | null): Promise<void> {
        validateNotNull(trackId, "trackId");
        validateNotBlank(musicProviderTrackId, "musicProviderTrackId");

        const dto = CreateMusicProviderTrackRelationDto.Builder
            .withMusicProviderId(this.providerId)
            .withTrackId(trackId)
            .withMusicProviderTrackId(musicProviderTrackId)
            .withMusicProviderTrackUri(musicProviderTrackUri)
            .build();

        return this.mapper.addMusicProviderTrackRelation(dto);
    } 
  
    public addMusicProviderArtistRelation(artistId: number, musicProviderArtistId: string, musicProviderArtistUri: string | null): Promise<void> {
        validateNotNull(artistId, "artistId");
        validateNotBlank(musicProviderArtistId, "musicProviderArtistId");

        const dto = CreateMusicProviderArtistRelationDto.Builder
            .withMusicProviderId(this.providerId)
            .withArtistId(artistId)
            .withMusicProviderArtistId(musicProviderArtistId)
            .withMusicProviderArtistUri(musicProviderArtistUri)
            .build();
            
        return this.mapper.addMusicProviderArtistRelation(dto);
    }

    public addMusicProviderAlbumRelation(albumId: number, musicProviderAlbumId: string, musicProviderAlbumUri: string | null): Promise<void> {
        validateNotNull(albumId, "albumId");
        validateNotBlank(musicProviderAlbumId, "musicProviderAlbumId");

        const dto = CreateMusicProviderAlbumRelationDto.Builder
            .withMusicProviderId(this.providerId)
            .withAlbumId(albumId)
            .withMusicProviderAlbumId(musicProviderAlbumId)
            .withMusicProviderAlbumUri(musicProviderAlbumUri)
            .build();

        return this.mapper.addMusicProviderAlbumRelation(dto);
    }
}