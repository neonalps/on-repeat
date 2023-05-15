import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { AlbumService } from "@src/modules/album/service";
import { MusicProviderService } from "@src/modules/music-provider/service";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { GetAlbumByIdHandler } from "@src/api/v1/album/get-by-id/handler";
import { GetAlbumByIdRouteProvider } from "@src/api/v1/album/get-by-id/route-provider";
import { ApiHelper } from "@src/api/helper";
import { ArtistService } from "@src/modules/artist/service";

export const getAlbumApiRouteProviders = () => {
    const albumService = dependencyManager.get<AlbumService>(Dependencies.AlbumService);
    const apiHelper = dependencyManager.get<ApiHelper>(Dependencies.ApiHelper);
    const artistService = dependencyManager.get<ArtistService>(Dependencies.ArtistService);
    const musicProviderService = dependencyManager.get<MusicProviderService>(Dependencies.MusicProviderService);
    const playedTrackService = dependencyManager.get<PlayedTrackService>(Dependencies.PlayedTrackService);

    const getAlbumByIdHandler = new GetAlbumByIdHandler(albumService, apiHelper, artistService, musicProviderService, playedTrackService);

    return [
        new GetAlbumByIdRouteProvider(getAlbumByIdHandler),
    ];

};