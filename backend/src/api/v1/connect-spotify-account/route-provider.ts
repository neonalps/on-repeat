import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { ConnectSpotifyAccountHandler } from "./handler";
import { ConnectSpotifyResponseDto } from "@src/models/api/connect-spotify-account-response";
import { ConnectSpotifyRequestDto } from "@src/models/api/connect-spotify-account";

export class ConnectSpotifyAccountRouteProvider implements RouteProvider<ConnectSpotifyRequestDto, ConnectSpotifyResponseDto> {

    private readonly connectSpotifyAccountHandler: ConnectSpotifyAccountHandler;

    constructor(connectSpotifyAccountHandler: ConnectSpotifyAccountHandler) {
        this.connectSpotifyAccountHandler = requireNonNull(connectSpotifyAccountHandler);
    }

    provide(): RouteDefinition<ConnectSpotifyRequestDto, ConnectSpotifyResponseDto> {
        const connectSpotifyAccountRequestDtoJsonSchema = {
            type: 'object',
            required: ['code'],
            properties: {
                code: { type: 'string' },
                state: { type: 'string' },
            }
        };

        const connectSpotifyAccountRequestSchema: RequestSchema = {
            body: connectSpotifyAccountRequestDtoJsonSchema
        };

        return {
            name: 'ConnectSpotifyAccount',
            method: 'POST',
            path: '/api/v1/connect/spotify',
            schema: connectSpotifyAccountRequestSchema, 
            handler: this.connectSpotifyAccountHandler,
            authenticated: true,
        };
    }

}