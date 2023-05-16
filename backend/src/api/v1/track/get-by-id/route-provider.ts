import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { GetTrackByIdRequestDto } from "@src/models/api/get-track-by-id-request";
import { DetailedTrackApiDto } from "@src/models/api/detailed-track";
import { GetTrackByIdHandler } from "@src/api/v1/track/get-by-id/handler";

export class GetTrackByIdRouteProvider implements RouteProvider<GetTrackByIdRequestDto, DetailedTrackApiDto> {

    private readonly handler: GetTrackByIdHandler;

    constructor(handler: GetTrackByIdHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetTrackByIdRequestDto, DetailedTrackApiDto> {
        const schema: RequestSchema = {
            params: {
                type: 'object',
                required: ['trackId'],
                properties: {
                    trackId: { type: 'string' },
                },
            }
        };

        return {
            name: 'GetTrackById',
            method: 'GET',
            path: '/api/v1/tracks/:trackId',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}