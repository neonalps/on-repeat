import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { MusicProviderService } from "@src/modules/music-provider/service";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { ApiHelper } from "@src/api/helper";
import { GetTrackByIdHandler } from "@src/api/v1/track/get-by-id/handler";
import { CatalogueService } from "@src/modules/catalogue/service";
import { GetTrackByIdRouteProvider } from "@src/api/v1/track/get-by-id/route-provider";

export const getTrackApiRouteProviders = () => {
    const apiHelper = dependencyManager.get<ApiHelper>(Dependencies.ApiHelper);
    const catalogueService = dependencyManager.get<CatalogueService>(Dependencies.CatalogueService);
    const musicProviderService = dependencyManager.get<MusicProviderService>(Dependencies.MusicProviderService);
    const playedTrackService = dependencyManager.get<PlayedTrackService>(Dependencies.PlayedTrackService);

    const getTrackByIdHandler = new GetTrackByIdHandler(apiHelper, catalogueService, musicProviderService, playedTrackService);

    return [
        new GetTrackByIdRouteProvider(getTrackByIdHandler),
    ];

};