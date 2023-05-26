import { ApiConfig } from "@src/api/config";
import { AlbumApiDto } from "@src/models/api/album";
import { ArtistApiDto } from "@src/models/api/artist";
import { TrackApiDto } from "@src/models/api/track";
import { AlbumDao } from "@src/models/classes/dao/album";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { TrackDao } from "@src/models/classes/dao/track";
import { requireNonNull } from "@src/util/common";

export class ApiHelper {

    private readonly apiConfig: ApiConfig;

    constructor(apiConfig: ApiConfig) {
        this.apiConfig = requireNonNull(apiConfig);
    }

    public getAlbumResourceUrl(albumId: number): string {
        return this.getResourceUrl(this.apiConfig.albumsPath, albumId);
    }

    public getArtistResourceUrl(artistId: number): string {
        return this.getResourceUrl(this.apiConfig.artistsPath, artistId);
    }

    public getTrackResourceUrl(trackId: number): string {
        return this.getResourceUrl(this.apiConfig.tracksPath, trackId);
    }

    public convertTrackApiDto(track: TrackDao, artists: ArtistDao[], album?: AlbumDao): TrackApiDto {
        return {
            id: track.id,
            name: track.name,
            album: this.convertAlbumApiDto(album),
            artists: this.convertArtistApiDtos(artists),
            href: this.getTrackResourceUrl(track.id),
        }
    }

    public convertAlbumApiDto(album?: AlbumDao): AlbumApiDto | null {
        if (!album) {
            return null;
        }

        const albumId = album.id;

        return {
            id: albumId,
            name: album.name,
            href: this.getAlbumResourceUrl(albumId),
        };
    }

    public convertArtistApiDtos(artists: ArtistDao[]): ArtistApiDto[] {
        if (!artists || artists.length === 0) {
            return [];
        }

        return artists.map(artist => {
            const artistId = artist.id;

            return { 
                id: artistId, 
                name: artist.name, 
                href: this.getArtistResourceUrl(artistId),
            };
        });
    }

    private getResourceUrl(resourcePath: string, resourceId: string | number): string {
        return [this.apiConfig.baseUrl, resourcePath, resourceId].join('/');
    }

}