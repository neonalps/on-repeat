import dependencyManager from "@src/di/manager";
import { AuthHandler } from "@src/api/auth/handler";
import { AuthRouteProvider } from "@src/api/auth/route-provider";
import { AuthService } from "@src/modules/auth/service";
import { Dependencies } from "@src/di/dependencies";
import { OauthLoginRouteProvider } from "@src/api/login/oauth/route-provider";
import { OauthLoginHandler } from "@src/api/login/oauth/handler";
import { AccountService } from "@src/modules/account/service";
import { JobHelper } from "@src/modules/job/helper";
import { ConnectSpotifyAccountHandler } from "@src/api/v1/connect-spotify-account/handler";
import { AccountTokenService } from "@src/modules/account-token/service";
import { ConnectSpotifyAccountRouteProvider } from "@src/api/v1/connect-spotify-account/route-provider";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { ManualSpotifyResponseUploadHandler } from "@src/api/v1/manual-spotify-response-upload/handler";
import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify/music-provider";
import { ManualSpotifyResponseUploadRouteProvider } from "@src/api/v1/manual-spotify-response-upload/route-provider";
import { getArtistApiRouteProviders } from "@src/api/v1/artist/artist-route-providers";
import { getPlayedTracksApiRouteProviders } from "@src/api/v1/played-tracks/played-tracks-route-providers";
import { getAlbumApiRouteProviders } from "@src/api/v1/album/album-route-providers";
import { RouteProvider } from "@src/router/types";
import { getTrackApiRouteProviders } from "@src/api/v1/track/track-route-providers";

export const getProviders = () => {
    const accountService = dependencyManager.get<AccountService>(Dependencies.AccountService);
    const accountTokenService = dependencyManager.get<AccountTokenService>(Dependencies.AccountTokenService);
    
    const authService = dependencyManager.get<AuthService>(Dependencies.AuthService);
    const jobHelper = dependencyManager.get<JobHelper>(Dependencies.JobHelper);
    const spotifyClient = dependencyManager.get<SpotifyClient>(Dependencies.SpotifyClient);
    const spotifyMusicProvider = dependencyManager.get<SpotifyMusicProvider>(Dependencies.SpotifyMusicProvider);

    const authHandler = new AuthHandler(authService);
    const connectSpotifyAccountHandler = new ConnectSpotifyAccountHandler(accountTokenService, jobHelper, spotifyClient);
    const manualSpotifyResponseUploadHandler = new ManualSpotifyResponseUploadHandler(spotifyMusicProvider);
    
    const oauthLoginHandler = new OauthLoginHandler(authService, accountService, spotifyClient);

    const providers: RouteProvider<any, any>[] = [
        ...getArtistApiRouteProviders(),
        ...getAlbumApiRouteProviders(),
        ...getTrackApiRouteProviders(),
        ...getPlayedTracksApiRouteProviders(),
        new AuthRouteProvider(authHandler),
        new ConnectSpotifyAccountRouteProvider(connectSpotifyAccountHandler),
        new ManualSpotifyResponseUploadRouteProvider(manualSpotifyResponseUploadHandler),
        new OauthLoginRouteProvider(oauthLoginHandler),
    ];

    return providers;
}