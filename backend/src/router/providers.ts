import dependencyManager from "@src/di/manager";
import { AuthHandler } from "@src/router/auth/handler";
import { AuthRouteProvider } from "@src/router/auth/route-provider";
import { AuthService } from "@src/modules/auth/service";
import { Dependencies } from "@src/di/dependencies";
import { OauthLoginRouteProvider } from "@src/router/login/oauth/route-provider";
import { OauthLoginHandler } from "@src/router/login/oauth/handler";
import { AccountService } from "@src/modules/account/service";
import { JobHelper } from "@src/modules/job/helper";
import { ConnectSpotifyAccountHandler } from "@src/router/connect-spotify-account/handler";
import { AccountTokenService } from "@src/modules/account-token/service";
import { ConnectSpotifyAccountRouteProvider } from "@src/router/connect-spotify-account/route-provider";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";

export const getProviders = () => {
    const accountService = dependencyManager.get<AccountService>(Dependencies.AccountService);
    const accountTokenService = dependencyManager.get<AccountTokenService>(Dependencies.AccountTokenService);
    const authService = dependencyManager.get<AuthService>(Dependencies.AuthService);
    const jobHelper = dependencyManager.get<JobHelper>(Dependencies.JobHelper);
    const spotifyClient = dependencyManager.get<SpotifyClient>(Dependencies.SpotifyClient);

    const authHandler = new AuthHandler(authService);
    const connectSpotifyAccountHandler = new ConnectSpotifyAccountHandler(accountTokenService, jobHelper, spotifyClient);
    const oauthLoginHandler = new OauthLoginHandler(authService, accountService, spotifyClient);

    const providers = [
        new AuthRouteProvider(authHandler),
        new ConnectSpotifyAccountRouteProvider(connectSpotifyAccountHandler),
        new OauthLoginRouteProvider(oauthLoginHandler),
    ];

    return providers;
};