import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { GetAlbumByIdRequestDto } from "@src/models/api/get-album-by-id-request";
import { DetailedAlbumApiDto } from "@src/models/api/detailed-album";
import { GetAlbumByIdHandler } from "./handler";

export class GetAlbumByIdRouteProvider implements RouteProvider<GetAlbumByIdRequestDto, DetailedAlbumApiDto> {

    private readonly handler: GetAlbumByIdHandler;

    constructor(handler: GetAlbumByIdHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetAlbumByIdRequestDto, DetailedAlbumApiDto> {
        const schema: RequestSchema = {
            params: {
                type: 'object',
                required: ['albumId'],
                properties: {
                    albumId: { type: 'string' },
                },
            }
        };

        return {
            name: 'GetAlbumById',
            method: 'GET',
            path: '/api/v1/albums/:albumId',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}