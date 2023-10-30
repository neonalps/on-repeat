import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { PAGINATED_REQUEST_QUERYSTRING_SCHEMA_PROPERTIES } from "@src/modules/pagination/constants";
import { GetArtistPlayedTracksPaginatedRequestDto } from "@src/models/api/get-artist-played-tracks-paginated-request";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { ArtistPlayedTrackApiDto } from "@src/models/api/artist-played-track";
import { GetArtistPlayedTracksPaginatedHandler } from "@src/api/v1/played-tracks/get-artist-played-tracks-paginated/handler";
import { GetArtistPlayedTracksSortKey } from "@src/modules/played-tracks/service";

export class GetArtistPlayedTracksPaginatedRouteProvider implements RouteProvider<GetArtistPlayedTracksPaginatedRequestDto, PaginatedResponseDto<ArtistPlayedTrackApiDto>> {

    private readonly handler: GetArtistPlayedTracksPaginatedHandler;

    constructor(handler: GetArtistPlayedTracksPaginatedHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetArtistPlayedTracksPaginatedRequestDto, PaginatedResponseDto<ArtistPlayedTrackApiDto>> {
        const schema: RequestSchema = {
            params: {
                type: 'object',
                required: ['artistId'],
                properties: {
                    artistId: { type: 'number' },
                },
            },
            querystring: {
                type: 'object',
                properties: {
                    sortBy: { type: 'string', enum: [ GetArtistPlayedTracksSortKey.TIMES_PLAYED ] },
                    ...PAGINATED_REQUEST_QUERYSTRING_SCHEMA_PROPERTIES,
                },
            },
        };

        return {
            name: 'GetArtistPlayedTracksPaginated',
            method: 'GET',
            path: '/api/v1/played-tracks/artists/:artistId',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}