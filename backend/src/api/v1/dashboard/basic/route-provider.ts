import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { GetBasicDashboardInformationRequestDto } from "@src/models/api/get-basic-dashboard-information-request";
import { BasicDashboardInformationApiDto } from "@src/models/api/basic-dashboard-information-response";
import { GetBasicDashboardInformationHandler } from "@src/api/v1/dashboard/basic/handler";

export class GetBasicDashboardInformationRouteProvider implements RouteProvider<GetBasicDashboardInformationRequestDto, BasicDashboardInformationApiDto> {

    private readonly handler: GetBasicDashboardInformationHandler;

    constructor(handler: GetBasicDashboardInformationHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetBasicDashboardInformationRequestDto, BasicDashboardInformationApiDto> {
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