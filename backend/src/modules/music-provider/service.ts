import { requireNonNull } from "@src/util/common";
import { MusicProviderMapper } from "@src/modules/music-provider/mapper";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { MusicProviderTrackDao } from "@src/models/classes/dao/music-provider-track";
import { MusicProviderArtistDao } from "@src/models/classes/dao/music-provider-artist";
import { MusicProviderAlbumDao } from "@src/models/classes/dao/music-provider-album";
import { CreateMusicProviderTrackRelationDto } from "@src/models/classes/dto/create-music-provider-track-relation";
import { CreateMusicProviderArtistRelationDto } from "@src/models/classes/dto/create-music-provider-artist-relation";
import { CreateMusicProviderAlbumRelationDto } from "@src/models/classes/dto/create-music-provider-album-relation";
import { SimpleMusicProviderArtistDao } from "@src/models/classes/dao/simple-music-provider-artist";

export class MusicProviderService {

    private readonly mapper: MusicProviderMapper;

    constructor(mapper: MusicProviderMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public getTrackByProviderTrackId(providerId: number, providerTrackId: string): Promise<MusicProviderTrackDao | null> {
        validateNotNull(providerId, "providerId");
        validateNotBlank(providerTrackId, "providerTrackId");

        return this.mapper.getTrackByProviderTrackId(providerId, providerTrackId);
    }

    public getArtistByProviderArtistId(providerId: number, providerArtistId: string): Promise<MusicProviderArtistDao | null> {
        validateNotNull(providerId, "providerId");
        validateNotBlank(providerArtistId, "providerArtistId");

        return this.mapper.getArtistByProviderArtistId(providerId, providerArtistId);
    }

    public getAlbumByProviderAlbumId(providerId: number, providerAlbumId: string): Promise<MusicProviderAlbumDao | null> {
        validateNotNull(providerId, "providerId");
        validateNotBlank(providerAlbumId, "providerAlbumId");

        return this.mapper.getAlbumByProviderAlbumId(providerId, providerAlbumId);
    }

    public addMusicProviderTrackRelation(providerId: number, trackId: number, musicProviderTrackId: string, musicProviderTrackUri: string | null): Promise<void> {
        validateNotNull(providerId, "providerId");
        validateNotNull(trackId, "trackId");
        validateNotBlank(musicProviderTrackId, "musicProviderTrackId");

        const dto = CreateMusicProviderTrackRelationDto.Builder
            .withMusicProviderId(providerId)
            .withTrackId(trackId)
            .withMusicProviderTrackId(musicProviderTrackId)
            .withMusicProviderTrackUri(musicProviderTrackUri)
            .build();

        return this.mapper.addMusicProviderTrackRelation(dto);
    } 
  
    public addMusicProviderArtistRelation(providerId: number, artistId: number, musicProviderArtistId: string, musicProviderArtistUri: string | null): Promise<void> {
        validateNotNull(providerId, "providerId");
        validateNotNull(artistId, "artistId");
        validateNotBlank(musicProviderArtistId, "musicProviderArtistId");

        const dto = CreateMusicProviderArtistRelationDto.Builder
            .withMusicProviderId(providerId)
            .withArtistId(artistId)
            .withMusicProviderArtistId(musicProviderArtistId)
            .withMusicProviderArtistUri(musicProviderArtistUri)
            .build();
            
        return this.mapper.addMusicProviderArtistRelation(dto);
    }

    public addMusicProviderAlbumRelation(providerId: number, albumId: number, musicProviderAlbumId: string, musicProviderAlbumUri: string | null): Promise<void> {
        validateNotNull(providerId, "providerId");
        validateNotNull(albumId, "albumId");
        validateNotBlank(musicProviderAlbumId, "musicProviderAlbumId");

        const dto = CreateMusicProviderAlbumRelationDto.Builder
            .withMusicProviderId(providerId)
            .withAlbumId(albumId)
            .withMusicProviderAlbumId(musicProviderAlbumId)
            .withMusicProviderAlbumUri(musicProviderAlbumUri)
            .build();

        return this.mapper.addMusicProviderAlbumRelation(dto);
    }

    public async getExternalUrlsForAlbum(albumId: number): Promise<Record<string, string>> {
        validateNotNull(albumId, "albumId");

        return this.mapper.getExternalUrlsForAlbum(albumId);
    }

    public async getExternalUrlsForArtist(artistId: number): Promise<Record<string, string>> {
        validateNotNull(artistId, "artistId");

        return this.mapper.getExternalUrlsForArtist(artistId);
    }

    public async getExternalUrlsForTrack(trackId: number): Promise<Record<string, string>> {
        validateNotNull(trackId, "trackId");

        return this.mapper.getExternalUrlsForTrack(trackId);
    }

    public async getArtistIdsWithoutImagesForMusicProvider(musicProviderId: number, artistIds: string[]): Promise<SimpleMusicProviderArtistDao[]> {
        validateNotNull(musicProviderId, "musicProviderId");
        validateNotNull(artistIds, "artistIds");

        return this.mapper.getArtistIdsWithoutImagesForMusicProvider(musicProviderId, artistIds);
    }

}