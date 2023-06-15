import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { GetPlayedTracksPaginatedHandler } from "@src/api/v1/played-tracks/get-all-paginated/handler";
import { PAGINATED_REQUEST_QUERYSTRING_SCHEMA_PROPERTIES } from "@src/modules/pagination/constants";
import { GetPlayedTracksPaginatedRequestDto } from "@src/models/api/get-played-tracks-paginated-request";
import { PlayedTrackApiDto } from "@src/models/api/played-track";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";

export class GetPlayedTracksPaginatedRouteProvider implements RouteProvider<GetPlayedTracksPaginatedRequestDto, PaginatedResponseDto<PlayedTrackApiDto>> {

    private readonly handler: GetPlayedTracksPaginatedHandler;

    constructor(handler: GetPlayedTracksPaginatedHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetPlayedTracksPaginatedRequestDto, PaginatedResponseDto<PlayedTrackApiDto>> {
        const schema: RequestSchema = {
            querystring: {
                type: 'object',
                required: [],
                properties: {
                    ...PAGINATED_REQUEST_QUERYSTRING_SCHEMA_PROPERTIES,
                },
            }
        };

        return {
            name: 'GetPlayedTracksPaginated',
            method: 'GET',
            path: '/api/v1/played-tracks',
            schema,
            handler: this.handler,
            authenticated: true,
        };
    }

}