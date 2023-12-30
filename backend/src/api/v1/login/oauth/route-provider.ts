import { OauthLoginHandler } from "./handler";
import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { OauthLoginRequestDto } from "@src/models/api/oauth-login-request";
import { LoginResponseDto } from "@src/models/api/login-response";

export class OauthLoginRouteProvider implements RouteProvider<OauthLoginRequestDto, LoginResponseDto> {

    private readonly handler: OauthLoginHandler;

    constructor(handler: OauthLoginHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<OauthLoginRequestDto, LoginResponseDto> {
        const schema: RequestSchema = {
            body: {
                type: 'object',
                required: ['provider', 'code'],
                properties: {
                    provider: { type: 'string', enum: ['spotify', 'google'] },
                    code: { type: 'string' },
                },
            }
        };

        return {
            name: 'OauthLogin',
            method: 'POST',
            path: '/api/v1/oauth/login',
            schema, 
            handler: this.handler,
            authenticated: false,
        };
    }

}