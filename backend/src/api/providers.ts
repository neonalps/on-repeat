import dependencyManager from "@src/di/manager";
import { AuthService } from "@src/modules/auth/service";
import { Dependencies } from "@src/di/dependencies";
import { OauthLoginRouteProvider } from "@src/api/login/oauth/route-provider";
import { OauthLoginHandler } from "@src/api/login/oauth/handler";
import { AccountService } from "@src/modules/account/service";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { ManualSpotifyResponseUploadHandler } from "@src/api/v1/manual-spotify-response-upload/handler";
import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify/music-provider";
import { ManualSpotifyResponseUploadRouteProvider } from "@src/api/v1/manual-spotify-response-upload/route-provider";
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

export function getRouteProviders(): RouteProvider<unknown, unknown>[] {
    const accountService = dependencyManager.get<AccountService>(Dependencies.AccountService);
    const authService = dependencyManager.get<AuthService>(Dependencies.AuthService);
    const chartService = dependencyManager.get<ChartService>(Dependencies.ChartService);
    const spotifyClient = dependencyManager.get<SpotifyClient>(Dependencies.SpotifyClient);
    const spotifyMusicProvider = dependencyManager.get<SpotifyMusicProvider>(Dependencies.SpotifyMusicProvider);
    const timeSource = dependencyManager.get<TimeSource>(Dependencies.TimeSource);

    const manualSpotifyResponseUploadHandler = new ManualSpotifyResponseUploadHandler(spotifyMusicProvider);
    const oauthLoginHandler = new OauthLoginHandler(authService, accountService, spotifyClient);
    const dashboardHandler = new GetDashboardInformationHandler(chartService, timeSource);

    const providers: RouteProvider<any, any>[] = [
        ...getAccountRouteProviders(),
        ...getAccountTokenRouteProviders(),
        ...getArtistApiRouteProviders(),
        ...getAlbumApiRouteProviders(),
        ...getTrackApiRouteProviders(),
        ...getPlayedTracksApiRouteProviders(),
        ...getChartApiRouteProviders(),
        ...getSearchRouteProviders(),
        new ManualSpotifyResponseUploadRouteProvider(manualSpotifyResponseUploadHandler),
        new OauthLoginRouteProvider(oauthLoginHandler),
        new GetDashboardInformationRouteProvider(dashboardHandler),
    ];

    return providers;
}