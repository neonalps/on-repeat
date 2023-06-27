import dependencyManager from "@src/di/manager";
import { Dependencies } from "@src/di/dependencies";
import { RouteProvider } from "@src/router/types";
import { AccountService } from "@src/modules/account/service";
import { AuthService } from "@src/modules/auth/service";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { OauthLoginHandler } from "@src/api/v1/login/oauth/handler";
import { OauthLoginRouteProvider } from "@src/api/v1/login/oauth/route-provider";

export function getLoginRouteProviders(): RouteProvider<any, any>[] {
    const accountService = dependencyManager.get<AccountService>(Dependencies.AccountService);
    const authService = dependencyManager.get<AuthService>(Dependencies.AuthService);
    const spotifyClient = dependencyManager.get<SpotifyClient>(Dependencies.SpotifyClient);

    const oauthLoginHandler = new OauthLoginHandler(authService, accountService, spotifyClient);

    return [
        new OauthLoginRouteProvider(oauthLoginHandler),
    ];
}