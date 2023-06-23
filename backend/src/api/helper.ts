import { ApiConfig } from "@src/api/config";
import { AccountTokenApiDto } from "@src/models/api/account-token";
import { AlbumApiDto } from "@src/models/api/album";
import { ArtistApiDto } from "@src/models/api/artist";
import { ImageApiDto } from "@src/models/api/image";
import { TrackApiDto } from "@src/models/api/track";
import { AccountTokenDao } from "@src/models/classes/dao/account-token";
import { AlbumDao } from "@src/models/classes/dao/album";
import { AlbumImageDao } from "@src/models/classes/dao/album-image";
import { SimpleAlbumDao } from "@src/models/classes/dao/album-simple";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { IdNameDao } from "@src/models/classes/dao/id-name";
import { SimpleTrackDetailsDao } from "@src/models/classes/dao/simple-track-details";
import { TrackDao } from "@src/models/classes/dao/track";
import { isDefined, removeNull, requireNonNull } from "@src/util/common";

type AlbumLike = AlbumDao | SimpleAlbumDao;
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

    public convertToTrackApiDtoFromSimpleTrackDetails(item: SimpleTrackDetailsDao): TrackApiDto {
        return {
            id: item.track.id,
            name: item.track.name,
            album: this.convertAlbumApiDto(item.album),
            artists: this.convertArtistApiDtos(Array.from(item.artists)),
            href: this.getTrackResourceUrl(item.track.id),
        }
    }

    public convertAccountTokenApiDto(accountToken: AccountTokenDao): AccountTokenApiDto | null {
        if (!accountToken) {
            return null;
        }

        const scopes = isDefined(accountToken.scope) ? accountToken.scope.split(" ") : [];

        return {
            publicId: accountToken.publicId,
            provider: accountToken.oauthProvider,
            scopes,
            createdAt: accountToken.createdAt,
        }
    }

    public convertAlbumApiDto(album?: AlbumLike | null): AlbumApiDto | null {
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