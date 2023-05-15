import { ApiConfig } from "@src/api/config";
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

    private getResourceUrl(resourcePath: string, resourceId: string | number): string {
        return [this.apiConfig.baseUrl, resourcePath, resourceId].join('/');
    }

}