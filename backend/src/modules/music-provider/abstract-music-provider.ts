import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { MusicProviderMapper } from "./mapper";
import { requireNonNull } from "@src/util/common";
import { CreateMusicProviderArtistRelationDto } from "@src/models/classes/dto/create-music-provider-artist-relation";
import { CreateMusicProviderTrackRelationDto } from "@src/models/classes/dto/create-music-provider-track-relation";
import { CreateMusicProviderAlbumRelationDto } from "@src/models/classes/dto/create-music-provider-album-relation";
import { MusicProviderTrackDao } from "@src/models/classes/dao/music-provider-track";
import { MusicProviderArtistDao } from "@src/models/classes/dao/music-provider-artist";
import { MusicProviderAlbumDao } from "@src/models/classes/dao/music-provider-album";

export abstract class MusicProvider {
    private readonly providerId: number;
    private readonly providerName: string;
    private readonly mapper: MusicProviderMapper;

    constructor(id: number, name: string, mapper: MusicProviderMapper) {
        this.providerId = requireNonNull(id);
        this.providerName = requireNonNull(name);
        this.mapper = requireNonNull(mapper);
    }

    public getProviderId(): number {
        return this.providerId;
    }

    public getProviderName(): string {
        return this.providerName;
    }

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