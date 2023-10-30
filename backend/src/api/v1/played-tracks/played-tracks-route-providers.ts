import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { GetPlayedTracksPaginatedHandler } from "@src/api/v1/played-tracks/get-all-paginated/handler";
import { GetPlayedTracksPaginatedRouteProvider } from "@src/api/v1/played-tracks/get-all-paginated/route-provider";
import { PaginationService } from "@src/modules/pagination/service";
import { ApiHelper } from "@src/api/helper";
import { GetArtistPlayedTracksPaginatedHandler } from "@src/api/v1/played-tracks/get-artist-played-tracks-paginated/handler";
import { GetArtistPlayedTracksPaginatedRouteProvider } from "@src/api/v1/played-tracks/get-artist-played-tracks-paginated/route-provider";
import { CatalogueService } from "@src/modules/catalogue/service";
import { GetPlayedTrackHistoryPaginatedRouteProvider } from "@src/api/v1/played-tracks/get-played-track-history-paginated/route-provider";
import { GetPlayedTrackHistoryPaginatedHandler } from "@src/api/v1/played-tracks/get-played-track-history-paginated/handler";

export function getPlayedTracksApiRouteProviders() {
    const apiHelper = dependencyManager.get<ApiHelper>(Dependencies.ApiHelper);
    const catalogueService = dependencyManager.get<CatalogueService>(Dependencies.CatalogueService);
    const paginationService = dependencyManager.get<PaginationService>(Dependencies.PaginationService);
    const playedTrackService = dependencyManager.get<PlayedTrackService>(Dependencies.PlayedTrackService);

    const getAllPaginatedHandler = new GetPlayedTracksPaginatedHandler(apiHelper, paginationService, playedTrackService);
    const getTrackHistoryPaginatedHandler = new GetPlayedTrackHistoryPaginatedHandler(paginationService, playedTrackService);
    const getArtistPlayedTracksPaginatedHandler = new GetArtistPlayedTracksPaginatedHandler(apiHelper, catalogueService, paginationService, playedTrackService);

    return [
        new GetPlayedTracksPaginatedRouteProvider(getAllPaginatedHandler),
        new GetPlayedTrackHistoryPaginatedRouteProvider(getTrackHistoryPaginatedHandler),
        new GetArtistPlayedTracksPaginatedRouteProvider(getArtistPlayedTracksPaginatedHandler),
    ];
};