import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { PAGINATED_REQUEST_QUERYSTRING_SCHEMA_PROPERTIES } from "@src/modules/pagination/constants";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { GetPlayedTrackHistoryPaginatedHandler } from "./handler";
import { PlayedHistoryApiDto } from "@src/models/api/played-history";
import { GetPlayedTrackHistoryPaginatedRequestDto } from "@src/models/api/get-played-track-history-paginated-request";

export class GetPlayedTrackHistoryPaginatedRouteProvider implements RouteProvider<GetPlayedTrackHistoryPaginatedRequestDto, PaginatedResponseDto<PlayedHistoryApiDto>> {

    private readonly handler: GetPlayedTrackHistoryPaginatedHandler;

    constructor(handler: GetPlayedTrackHistoryPaginatedHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetPlayedTrackHistoryPaginatedRequestDto, PaginatedResponseDto<PlayedHistoryApiDto>> {
        const schema: RequestSchema = {
            params: {
                type: 'object',
                required: [],
                properties: {
                    trackId: { type: 'number' },
                },
            },
            querystring: {
                type: 'object',
                required: [],
                properties: {
                    ...PAGINATED_REQUEST_QUERYSTRING_SCHEMA_PROPERTIES,
                },
            }
        };

        return {
            name: 'GetPlayedTrackHistoryPaginated',
            method: 'GET',
            path: '/api/v1/played-tracks/tracks/:trackId',
            schema,
            handler: this.handler,
            authenticated: true,
        };
    }

}