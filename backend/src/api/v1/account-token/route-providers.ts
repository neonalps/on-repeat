import dependencyManager from "@src/di/manager";
import { Dependencies } from "@src/di/dependencies";
import { RouteProvider } from "@src/router/types";
import { CreateAccountTokenHandler } from "@src/api/v1/account-token/create/handler";
import { AccountTokenService } from "@src/modules/account-token/service";
import { JobHelper } from "@src/modules/job/helper";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { UuidSource } from "@src/util/uuid";
import { CreateAccountTokenRouteProvider } from "@src/api/v1/account-token/create/route-provider";

export function getAccountTokenRouteProviders(): RouteProvider<any, any>[] {
    const accountTokenService = dependencyManager.get<AccountTokenService>(Dependencies.AccountTokenService);
    const jobHelper = dependencyManager.get<JobHelper>(Dependencies.JobHelper);
    const spotifyClient = dependencyManager.get<SpotifyClient>(Dependencies.SpotifyClient);
    const uuidSource = dependencyManager.get<UuidSource>(Dependencies.UuidSource);

    const createAccountTokenHandler = new CreateAccountTokenHandler(accountTokenService, jobHelper, spotifyClient, uuidSource);

    return [
        new CreateAccountTokenRouteProvider(createAccountTokenHandler),
    ];
}