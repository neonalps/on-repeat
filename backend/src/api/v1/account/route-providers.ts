import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { AccountService } from "@src/modules/account/service";
import { UpdateAccountDisplayNameHandler } from "./update-display-name/handler";
import { RouteProvider } from "@src/router/types";
import { UpdateAccountDisplayNameRouteProvider } from "./update-display-name/route-provider";

export function getAccountRouteProviders(): RouteProvider<any, any>[] {
    const accountService = dependencyManager.get<AccountService>(Dependencies.AccountService);

    const updateDisplayNameHandler = new UpdateAccountDisplayNameHandler(accountService);

    return [
        new UpdateAccountDisplayNameRouteProvider(updateDisplayNameHandler),
    ];
}