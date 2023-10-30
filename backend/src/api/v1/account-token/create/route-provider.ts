import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { CreateAccountTokenHandler } from "./handler";
import { CreateAccountTokenRequestDto } from "@src/models/api/create-account-token-request";
import { CreateAccountTokenResponseDto } from "@src/models/api/create-account-token-response";
import { OAUTH_PROVIDER_SPOTIFY } from "@src/modules/oauth/constants";

export class CreateAccountTokenRouteProvider implements RouteProvider<CreateAccountTokenRequestDto, CreateAccountTokenResponseDto> {

    private readonly handler: CreateAccountTokenHandler;

    constructor(handler: CreateAccountTokenHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<CreateAccountTokenRequestDto, CreateAccountTokenResponseDto> {
        const schema: RequestSchema = {
            body: {
                type: 'object',
                required: ['provider', 'code'],
                properties: {
                    provider: { type: 'string', enum: [ OAUTH_PROVIDER_SPOTIFY ] },
                    code: { type: 'string' },
                    state: { type: 'string' },
                },
            }
        };

        return {
            name: 'CreateAccountToken',
            method: 'POST',
            path: '/api/v1/account-tokens',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}