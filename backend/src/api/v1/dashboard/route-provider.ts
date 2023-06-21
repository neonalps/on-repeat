import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { GetDashboardInformationRequestDto } from "@src/models/api/get-dashboard-information-request";
import { DashboardInformationApiDto } from "@src/models/api/dashboard-information-response";
import { GetDashboardInformationHandler } from "@src/api/v1/dashboard/handler";

export class GetDashboardInformationRouteProvider implements RouteProvider<GetDashboardInformationRequestDto, DashboardInformationApiDto> {

    private readonly handler: GetDashboardInformationHandler;

    constructor(handler: GetDashboardInformationHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetDashboardInformationRequestDto, DashboardInformationApiDto> {
        const schema: RequestSchema = {};

        return {
            name: 'GetDashboardInformation',
            method: 'GET',
            path: '/api/v1/dashboard',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}