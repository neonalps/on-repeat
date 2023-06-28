import dependencyManager from "@src/di/manager";
import { Dependencies } from "@src/di/dependencies";
import { getArtistApiRouteProviders } from "@src/api/v1/artist/artist-route-providers";
import { getPlayedTracksApiRouteProviders } from "@src/api/v1/played-tracks/played-tracks-route-providers";
import { getAlbumApiRouteProviders } from "@src/api/v1/album/album-route-providers";
import { RouteProvider } from "@src/router/types";
import { getTrackApiRouteProviders } from "@src/api/v1/track/track-route-providers";
import { getChartApiRouteProviders } from "@src/api/v1/chart/chart-route-providers";
import { getSearchRouteProviders } from "@src/api/v1/search/search-route-providers";
import { GetDashboardInformationRouteProvider } from "@src/api/v1/dashboard/route-provider";
import { GetDashboardInformationHandler } from "@src/api/v1/dashboard/handler";
import { ChartService } from "@src/modules/chart/service";
import { TimeSource } from "@src/util/time";
import { getAccountRouteProviders } from "@src/api/v1/account/route-providers";
import { getAccountTokenRouteProviders } from "@src/api/v1/account-token/route-providers";
import { getAccountJobScheduleRouteProviders } from "@src/api/v1/account-job-schedule/route-providers";
import { getLoginRouteProviders } from "./v1/login/route-providers";
import { getOpsRouteProviders } from "./v1/ops/route-providers";

export function getRouteProviders(): RouteProvider<unknown, unknown>[] {
    const chartService = dependencyManager.get<ChartService>(Dependencies.ChartService);
    
    const timeSource = dependencyManager.get<TimeSource>(Dependencies.TimeSource);

    const dashboardHandler = new GetDashboardInformationHandler(chartService, timeSource);

    const providers: RouteProvider<any, any>[] = [
        ...getAccountRouteProviders(),
        ...getAccountJobScheduleRouteProviders(),
        ...getAccountTokenRouteProviders(),
        ...getArtistApiRouteProviders(),
        ...getAlbumApiRouteProviders(),
        ...getChartApiRouteProviders(),
        ...getLoginRouteProviders(),
        ...getOpsRouteProviders(),
        ...getPlayedTracksApiRouteProviders(),
        ...getSearchRouteProviders(),
        ...getTrackApiRouteProviders(),
        new GetDashboardInformationRouteProvider(dashboardHandler),
    ];

    return providers;
}