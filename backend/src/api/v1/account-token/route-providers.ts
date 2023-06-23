import dependencyManager from "@src/di/manager";
import { Dependencies } from "@src/di/dependencies";
import { RouteProvider } from "@src/router/types";
import { CreateAccountTokenHandler } from "@src/api/v1/account-token/create/handler";
import { AccountTokenService } from "@src/modules/account-token/service";
import { JobHelper } from "@src/modules/job/helper";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { UuidSource } from "@src/util/uuid";
import { CreateAccountTokenRouteProvider } from "@src/api/v1/account-token/create/route-provider";
import { GetAllAccountTokensHandler } from "@src/api/v1/account-token/get-all/handler";
import { GetAllAccountTokensRouteProvider } from "@src/api/v1/account-token/get-all/route-provider";
import { ApiHelper } from "@src/api/helper";
import { DeleteAccountTokenByIdHandler } from "@src/api/v1/account-token/delete-by-id/handler";
import { DeleteAccountTokenByIdRouteProvider } from "./delete-by-id/route-provider";

export function getAccountTokenRouteProviders(): RouteProvider<any, any>[] {
    const accountTokenService = dependencyManager.get<AccountTokenService>(Dependencies.AccountTokenService);
    const apiHelper = dependencyManager.get<ApiHelper>(Dependencies.ApiHelper);
    const jobHelper = dependencyManager.get<JobHelper>(Dependencies.JobHelper);
    const spotifyClient = dependencyManager.get<SpotifyClient>(Dependencies.SpotifyClient);
    const uuidSource = dependencyManager.get<UuidSource>(Dependencies.UuidSource);

    const createAccountTokenHandler = new CreateAccountTokenHandler(accountTokenService, jobHelper, spotifyClient, uuidSource);
    const deleteAccountTokenByIdHandler = new DeleteAccountTokenByIdHandler(accountTokenService);
    const getAllAccountTokensHandler = new GetAllAccountTokensHandler(accountTokenService, apiHelper);

    return [
        new CreateAccountTokenRouteProvider(createAccountTokenHandler),
        new DeleteAccountTokenByIdRouteProvider(deleteAccountTokenByIdHandler),
        new GetAllAccountTokensRouteProvider(getAllAccountTokensHandler),
    ];
}