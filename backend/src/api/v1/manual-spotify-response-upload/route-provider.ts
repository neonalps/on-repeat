import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { ManualSpotifyResponseUploadHandler } from "@src/api/v1/manual-spotify-response-upload/handler";
import { ManualSpotifyResponseUploadDto } from "@src/models/api/manual-spotify-response-upload";

export class ManualSpotifyResponseUploadRouteProvider implements RouteProvider<ManualSpotifyResponseUploadDto, void> {

    private readonly manualSpotifyResponseUploadHandler: ManualSpotifyResponseUploadHandler;

    constructor(manualSpotifyResponseUploadHandler: ManualSpotifyResponseUploadHandler) {
        this.manualSpotifyResponseUploadHandler = requireNonNull(manualSpotifyResponseUploadHandler);
    }

    provide(): RouteDefinition<ManualSpotifyResponseUploadDto, void> {
        const manualSpotifyResponseUploadDtoJsonSchema = {
            type: 'object',
            required: ['response'],
            properties: {
                response: { type: 'object' },
            }
        };

        const manualSpotifyResponseUploadRequestSchema: RequestSchema = {
            body: manualSpotifyResponseUploadDtoJsonSchema,
        };

        return {
            name: 'ManualSpotifyResponseUpload',
            method: 'POST',
            path: '/api/v1/ops/spotify-response-upload',
            schema: manualSpotifyResponseUploadRequestSchema, 
            handler: this.manualSpotifyResponseUploadHandler,
            authenticated: true,
        };
    }

}