import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { MusicProviderService } from "@src/modules/music-provider/service";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { GetAlbumByIdHandler } from "@src/api/v1/album/get-by-id/handler";
import { GetAlbumByIdRouteProvider } from "@src/api/v1/album/get-by-id/route-provider";
import { ApiHelper } from "@src/api/helper";
import { CatalogueService } from "@src/modules/catalogue/service";

export const getAlbumApiRouteProviders = () => {
    const apiHelper = dependencyManager.get<ApiHelper>(Dependencies.ApiHelper);
    const catalogueService = dependencyManager.get<CatalogueService>(Dependencies.CatalogueService);
    const musicProviderService = dependencyManager.get<MusicProviderService>(Dependencies.MusicProviderService);
    const playedTrackService = dependencyManager.get<PlayedTrackService>(Dependencies.PlayedTrackService);

    const getAlbumByIdHandler = new GetAlbumByIdHandler(apiHelper, catalogueService, musicProviderService, playedTrackService);

    return [
        new GetAlbumByIdRouteProvider(getAlbumByIdHandler),
    ];

};