import dependencyManager from "@src/di/manager";
import { GetArtistByIdHandler } from "@src/api/v1/artist/get-by-id/handler";
import { Dependencies } from "@src/di/dependencies";
import { GetArtistByIdRouteProvider } from "@src/api/v1/artist/get-by-id/route-provider";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { MusicProviderService } from "@src/modules/music-provider/service";
import { CatalogueService } from "@src/modules/catalogue/service";
import { ApiHelper } from "@src/api/helper";

export const getArtistApiRouteProviders = () => {
    const apiHelper = dependencyManager.get<ApiHelper>(Dependencies.ApiHelper);
    const catalogueService = dependencyManager.get<CatalogueService>(Dependencies.CatalogueService);
    const musicProviderService = dependencyManager.get<MusicProviderService>(Dependencies.MusicProviderService);
    const playedTrackService = dependencyManager.get<PlayedTrackService>(Dependencies.PlayedTrackService);

    const getArtistByIdHandler = new GetArtistByIdHandler(apiHelper, catalogueService, musicProviderService, playedTrackService);

    return [
        new GetArtistByIdRouteProvider(getArtistByIdHandler),
    ];
};