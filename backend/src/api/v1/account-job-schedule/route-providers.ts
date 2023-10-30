import dependencyManager from "@src/di/manager";
import { Dependencies } from "@src/di/dependencies";
import { RouteProvider } from "@src/router/types";
import { AccountJobScheduleService } from "@src/modules/account-jobs-schedules/service";
import { ApiHelper } from "@src/api/helper";
import { PaginationService } from "@src/modules/pagination/service";
import { GetAllAccountJobSchedulesPaginatedHandler } from "@src/api/v1/account-job-schedule/get-all-paginated/handler";
import { GetAllAccountJobSchedulesPaginatedRouteProvider } from "@src/api/v1/account-job-schedule/get-all-paginated/route-provider";

export function getAccountJobScheduleRouteProviders(): RouteProvider<any, any>[] {
    const accountJobScheduleService = dependencyManager.get<AccountJobScheduleService>(Dependencies.AccountJobScheduleService);
    const apiHelper = dependencyManager.get<ApiHelper>(Dependencies.ApiHelper);
    const paginationService = dependencyManager.get<PaginationService>(Dependencies.PaginationService);

    const getAllAccountJobSchedulesPaginatedHandler = new GetAllAccountJobSchedulesPaginatedHandler(accountJobScheduleService, apiHelper, paginationService);

    return [
        new GetAllAccountJobSchedulesPaginatedRouteProvider(getAllAccountJobSchedulesPaginatedHandler),
    ];
}