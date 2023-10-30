import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { GetArtistByIdHandler } from "@src/api/v1/artist/get-by-id/handler";
import { GetArtistByIdRequestDto } from "@src/models/api/get-artist-by-id-request";
import { DetailedArtistApiDto } from "@src/models/api/detailed-artist";

export class GetArtistByIdRouteProvider implements RouteProvider<GetArtistByIdRequestDto, DetailedArtistApiDto> {

    private readonly getArtistByIdHandler: GetArtistByIdHandler;

    constructor(getArtistByIdHandler: GetArtistByIdHandler) {
        this.getArtistByIdHandler = requireNonNull(getArtistByIdHandler);
    }

    provide(): RouteDefinition<GetArtistByIdRequestDto, DetailedArtistApiDto> {
        const getArtistByIdRequestSchema: RequestSchema = {
            params: {
                type: 'object',
                required: ['artistId'],
                properties: {
                    artistId: { type: 'string' },
                },
            }
        };

        return {
            name: 'GetArtistById',
            method: 'GET',
            path: '/api/v1/artists/:artistId',
            schema: getArtistByIdRequestSchema, 
            handler: this.getArtistByIdHandler,
            authenticated: true,
        };
    }

}