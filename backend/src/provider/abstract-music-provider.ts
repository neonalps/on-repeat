import { validateNotBlank, validateNotNull } from "@src/util/validation";
import musicProviderMapper from "./music-provider-mapper";

export abstract class MusicProvider {
    protected providerId: number;
    protected providerName: string;

    constructor(id: number, name: string) {
        this.providerId = id;
        this.providerName = name;
    }

    public abstract processPlayedTracks(accountId: number, playedTracks: PlayedTrackDto[]): Promise<void>;

    public getTrackByProviderTrackId(providerTrackId: string): Promise<MusicProviderTrackDao | null> {
        validateNotBlank(providerTrackId, "providerTrackId");
        return musicProviderMapper.getTrackByProviderTrackId(this.providerId, providerTrackId);
    }

    public getArtistByProviderArtistId(providerArtistId: string): Promise<MusicProviderArtistDao | null> {
        validateNotBlank(providerArtistId, "providerArtistId");
        return musicProviderMapper.getArtistByProviderArtistId(this.providerId, providerArtistId);
    }

    public getAlbumIdByProviderAlbumId(providerAlbumId: string): Promise<MusicProviderAlbumDao | null> {
        validateNotBlank(providerAlbumId, "providerAlbumId");
        return musicProviderMapper.getAlbumByProviderAlbumId(this.providerId, providerAlbumId);
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

        return musicProviderMapper.addMusicProviderTrackRelation(dto);
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
            
        return musicProviderMapper.addMusicProviderArtistRelation(dto);
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

        return musicProviderMapper.addMusicProviderAlbumRelation(dto);
    }
}