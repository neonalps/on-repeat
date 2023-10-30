import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { ManualSpotifyResponseUploadHandler } from "@src/api/v1/ops/manual-spotify-response-upload/handler";
import { ManualSpotifyResponseUploadDto } from "@src/models/api/manual-spotify-response-upload";

export class ManualSpotifyResponseUploadRouteProvider implements RouteProvider<ManualSpotifyResponseUploadDto, void> {

    private readonly handler: ManualSpotifyResponseUploadHandler;

    constructor(handler: ManualSpotifyResponseUploadHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<ManualSpotifyResponseUploadDto, void> {
        const schema: RequestSchema = {
            body: {
                type: 'object',
                required: ['response'],
                properties: {
                    response: { type: 'object' },
                }
            },
        };

        return {
            name: 'ManualSpotifyResponseUpload',
            method: 'POST',
            path: '/api/v1/ops/spotify-response-upload',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}