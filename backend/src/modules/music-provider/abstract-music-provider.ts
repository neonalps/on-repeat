import { requireNonNull } from "@src/util/common";
import { MusicProviderTrackDao } from "@src/models/classes/dao/music-provider-track";
import { MusicProviderArtistDao } from "@src/models/classes/dao/music-provider-artist";
import { MusicProviderAlbumDao } from "@src/models/classes/dao/music-provider-album";
import { MusicProviderService } from "./service";

export abstract class MusicProvider {
    private readonly providerId: number;
    private readonly providerName: string;
    
    protected readonly musicProviderService: MusicProviderService;

    constructor(id: number, name: string, musicProviderService: MusicProviderService) {
        this.providerId = requireNonNull(id);
        this.providerName = requireNonNull(name);
        this.musicProviderService = requireNonNull(musicProviderService);
    }

    public getProviderId(): number {
        return this.providerId;
    }

    public getProviderName(): string {
        return this.providerName;
    }

    public getTrackByProviderTrackId(providerTrackId: string): Promise<MusicProviderTrackDao | null> {
        return this.musicProviderService.getTrackByProviderTrackId(this.providerId, providerTrackId);
    }

    public getArtistByProviderArtistId(providerArtistId: string): Promise<MusicProviderArtistDao | null> {
        return this.musicProviderService.getArtistByProviderArtistId(this.providerId, providerArtistId);
    }

    public getAlbumByProviderAlbumId(providerAlbumId: string): Promise<MusicProviderAlbumDao | null> {
        return this.musicProviderService.getAlbumByProviderAlbumId(this.providerId, providerAlbumId);
    }

    public addMusicProviderTrackRelation(trackId: number, musicProviderTrackId: string, musicProviderTrackUri: string | null): Promise<void> {
        return this.musicProviderService.addMusicProviderTrackRelation(this.providerId, trackId, musicProviderTrackId, musicProviderTrackUri);
    } 
  
    public addMusicProviderArtistRelation(artistId: number, musicProviderArtistId: string, musicProviderArtistUri: string | null): Promise<void> {
        return this.musicProviderService.addMusicProviderArtistRelation(this.providerId, artistId, musicProviderArtistId, musicProviderArtistUri);
    }

    public addMusicProviderAlbumRelation(albumId: number, musicProviderAlbumId: string, musicProviderAlbumUri: string | null): Promise<void> {
        return this.musicProviderService.addMusicProviderAlbumRelation(this.providerId, albumId, musicProviderAlbumId, musicProviderAlbumUri);
    }
}