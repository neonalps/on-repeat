import dependencyManager from "@src/di/manager";
import { Dependencies } from "@src/di/dependencies";
import { RouteProvider } from "@src/router/types";
import { ChartService } from "@src/modules/chart/service";
import { TimeSource } from "@src/util/time";
import { GetBasicDashboardInformationHandler } from "@src/api/v1/dashboard/basic/handler";
import { GetBasicDashboardInformationRouteProvider } from "@src/api/v1/dashboard/basic/route-provider";
import { PlayedTrackService } from "@src/modules/played-tracks/service";

export function getDashboardRouteProviders(): RouteProvider<any, any>[] {
    const chartService = dependencyManager.get<ChartService>(Dependencies.ChartService);
    const playedTrackService = dependencyManager.get<PlayedTrackService>(Dependencies.PlayedTrackService);
    const timeSource = dependencyManager.get<TimeSource>(Dependencies.TimeSource);

    const dashboardHandler = new GetBasicDashboardInformationHandler(chartService, playedTrackService, timeSource);

    return [
        new GetBasicDashboardInformationRouteProvider(dashboardHandler),
    ];
}