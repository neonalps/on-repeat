import { OauthLoginHandler } from "./handler";
import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { OauthLoginRequestDto } from "@src/models/api/oauth-login-request";
import { LoginResponseDto } from "@src/models/api/login-response";

export class OauthLoginRouteProvider implements RouteProvider<OauthLoginRequestDto, LoginResponseDto> {

    private readonly oauthLoginHandler: OauthLoginHandler;

    constructor(oauthLoginHandler: OauthLoginHandler) {
        this.oauthLoginHandler = requireNonNull(oauthLoginHandler);
    }

    provide(): RouteDefinition<OauthLoginRequestDto, LoginResponseDto> {
        const oauthLoginRequestDtoJsonSchema = {
            type: 'object',
            required: ['provider', 'code'],
            properties: {
                provider: { type: 'string', enum: ['spotify', 'google'] },
                code: { type: 'string' },
                state: { type: 'string' },
            }
        };

        const oauthLoginRequestSchema: RequestSchema = {
            body: oauthLoginRequestDtoJsonSchema
        };

        return {
            name: 'OauthLogin',
            method: 'POST',
            path: '/api/v1/oauth/login',
            schema: oauthLoginRequestSchema, 
            handler: this.oauthLoginHandler,
            authenticated: false,
        };
    }

}