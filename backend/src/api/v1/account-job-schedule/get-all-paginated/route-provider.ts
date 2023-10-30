import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { GetAllAccountJobSchedulesPaginatedHandler } from "@src/api/v1/account-job-schedule/get-all-paginated/handler";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { GetAccountJobSchedulesPaginatedRequestDto } from "@src/models/api/get-account-job-schedules-paginated-request";
import { AccountJobScheduleApiDto } from "@src/models/api/account-job-schedule";
import { PAGINATED_REQUEST_QUERYSTRING_SCHEMA_PROPERTIES } from "@src/modules/pagination/constants";
import { JobStatus } from "@src/models/enum/job-status";

export class GetAllAccountJobSchedulesPaginatedRouteProvider implements RouteProvider<GetAccountJobSchedulesPaginatedRequestDto, PaginatedResponseDto<AccountJobScheduleApiDto>> {

    private readonly handler: GetAllAccountJobSchedulesPaginatedHandler;

    constructor(handler: GetAllAccountJobSchedulesPaginatedHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetAccountJobSchedulesPaginatedRequestDto, PaginatedResponseDto<AccountJobScheduleApiDto>> {
        const schema: RequestSchema = {
            querystring: {
                type: 'object',
                required: [],
                properties: {
                    ...PAGINATED_REQUEST_QUERYSTRING_SCHEMA_PROPERTIES,
                    state: {
                        type: 'string',
                        enum: [ JobStatus.FAILED, JobStatus.READY, JobStatus.SCHEDULED, JobStatus.STARTED, JobStatus.SUCCEEDED ],
                    }
                },
            },
        };

        return {
            name: 'GetAllAccountJobSchedulesPaginated',
            method: 'GET',
            path: '/api/v1/account-job-schedules',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}