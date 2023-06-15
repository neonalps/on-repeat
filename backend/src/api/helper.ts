import { ApiConfig } from "@src/api/config";
import { AlbumApiDto } from "@src/models/api/album";
import { ArtistApiDto } from "@src/models/api/artist";
import { ImageApiDto } from "@src/models/api/image";
import { TrackApiDto } from "@src/models/api/track";
import { AlbumDao } from "@src/models/classes/dao/album";
import { AlbumImageDao } from "@src/models/classes/dao/album-image";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { IdNameDao } from "@src/models/classes/dao/id-name";
import { TrackDao } from "@src/models/classes/dao/track";
import { removeNull, requireNonNull } from "@src/util/common";

type ArtistLike = ArtistDao | IdNameDao;
type ImageLike = AlbumImageDao;

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
            images: this.convertImageApiDtos(Array.from(album.images)),
        };
    }

    public convertArtistApiDto(artist: ArtistLike): ArtistApiDto | null {
        if (!artist) {
            return null;
        }

        const artistId = artist.id;

        return { 
            id: artistId, 
            name: artist.name, 
            href: this.getArtistResourceUrl(artistId),
        };
    }

    public convertArtistApiDtos(artists: ArtistLike[]): ArtistApiDto[] {
        if (!artists || artists.length === 0) {
            return [];
        }

        return artists.map(artist => this.convertArtistApiDto(artist)).filter(removeNull) as ArtistApiDto[];
    }

    public convertImageApiDtos(images: ImageLike[]): ImageApiDto[] {
        return images.map(item => this.convertImageApiDto(item));
    }

    public convertImageApiDto(image: ImageLike): ImageApiDto {
        return {
            height: image.height,
            width: image.width,
            url: image.url,
        }
    }

    private getResourceUrl(resourcePath: string, resourceId: string | number): string {
        return [this.apiConfig.baseUrl, resourcePath, resourceId].join('/');
    }

}