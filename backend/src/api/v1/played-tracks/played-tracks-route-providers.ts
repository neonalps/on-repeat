import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { GetPlayedTracksPaginatedHandler } from "@src/api/v1/played-tracks/get-paginated/handler";
import { GetPlayedTracksPaginatedRouteProvider } from "@src/api/v1/played-tracks/get-paginated/route-provider";
import { PaginationService } from "@src/modules/pagination/service";

export const getPlayedTracksApiRouteProviders = () => {
    const paginationService = dependencyManager.get<PaginationService>(Dependencies.PaginationService);
    const playedTrackService = dependencyManager.get<PlayedTrackService>(Dependencies.PlayedTrackService);

    const getAllPaginatedHandler = new GetPlayedTracksPaginatedHandler(paginationService, playedTrackService);

    return [
        new GetPlayedTracksPaginatedRouteProvider(getAllPaginatedHandler),
    ];
};