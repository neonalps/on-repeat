import dependencyManager from "@src/di/manager";
import { AuthHandler } from "@src/router/auth/handler";
import { AuthRouteProvider } from "@src/router/auth/route-provider";
import { AuthService } from "@src/modules/auth/service";
import { Dependencies } from "@src/di/dependencies";
import { OauthLoginRouteProvider } from "@src/router/login/oauth/route-provider";
import { OauthLoginHandler } from "@src/router/login/oauth/handler";
import { AccountService } from "@src/modules/account/service";
import { SpotifyClient } from "@src/modules/clients/spotify";
import { JobHelper } from "@src/modules/job/helper";

export const getProviders = () => {
    const accountService = dependencyManager.get<AccountService>(Dependencies.AccountService);
    const authService = dependencyManager.get<AuthService>(Dependencies.AuthService);
    const jobHelper = dependencyManager.get<JobHelper>(Dependencies.JobHelper);
    const spotifyClient = dependencyManager.get<SpotifyClient>(Dependencies.SpotifyClient);

    const autHandler = new AuthHandler(authService);
    const oauthLoginHandler = new OauthLoginHandler(authService, accountService, jobHelper, spotifyClient);

    const providers = [
        new AuthRouteProvider(autHandler),
        new OauthLoginRouteProvider(oauthLoginHandler),
    ];

    return providers;
};