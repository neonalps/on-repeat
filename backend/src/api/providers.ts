import { getArtistApiRouteProviders } from "@src/api/v1/artist/artist-route-providers";
import { getPlayedTracksApiRouteProviders } from "@src/api/v1/played-tracks/played-tracks-route-providers";
import { getAlbumApiRouteProviders } from "@src/api/v1/album/album-route-providers";
import { RouteProvider } from "@src/router/types";
import { getTrackApiRouteProviders } from "@src/api/v1/track/track-route-providers";
import { getChartApiRouteProviders } from "@src/api/v1/chart/chart-route-providers";
import { getSearchRouteProviders } from "@src/api/v1/search/search-route-providers";
import { getAccountRouteProviders } from "@src/api/v1/account/route-providers";
import { getAccountTokenRouteProviders } from "@src/api/v1/account-token/route-providers";
import { getAccountJobScheduleRouteProviders } from "@src/api/v1/account-job-schedule/route-providers";
import { getLoginRouteProviders } from "@src/api//v1/login/route-providers";
import { getOpsRouteProviders } from "@src/api/v1/ops/route-providers";
import { getDashboardRouteProviders } from "@src/api/v1/dashboard/route-providers";

export function getRouteProviders(): RouteProvider<any, any>[] {

    return [
        ...getAccountRouteProviders(),
        ...getAccountJobScheduleRouteProviders(),
        ...getAccountTokenRouteProviders(),
        ...getArtistApiRouteProviders(),
        ...getAlbumApiRouteProviders(),
        ...getChartApiRouteProviders(),
        ...getDashboardRouteProviders(),
        ...getLoginRouteProviders(),
        ...getOpsRouteProviders(),
        ...getPlayedTracksApiRouteProviders(),
        ...getSearchRouteProviders(),
        ...getTrackApiRouteProviders(),
    ];
    
}