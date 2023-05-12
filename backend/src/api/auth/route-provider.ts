import { FastifySchema } from "fastify";
import { RouteDefinition, RouteProvider } from "@src/router/types";
import { CreateAccessTokenRequestDto } from "@src/models/api/create-access-token";
import { CreateAccessTokenResponseDto } from "@src/models/api/create-access-token-response";
import { AuthHandler } from "./handler";
import { requireNonNull } from "@src/util/common";

export class AuthRouteProvider implements RouteProvider<CreateAccessTokenRequestDto, CreateAccessTokenResponseDto> {

    private readonly authHandler: AuthHandler;

    constructor(authHandler: AuthHandler) {
        this.authHandler = requireNonNull(authHandler);
    }

    provide(): RouteDefinition<CreateAccessTokenRequestDto, CreateAccessTokenResponseDto> {
        const createAuthTokenDtoJsonSchema = {
            type: 'object',
            required: ['accountId'],
            properties: {
                accountId: { type: 'string' }
            }
        };

        const createAuthTokenSchema: FastifySchema = {
            body: createAuthTokenDtoJsonSchema,
        };

        return {
            method: 'POST',
            path: '/api/v1/auth/token',
            schema: createAuthTokenSchema, 
            handler: this.authHandler,
            authenticated: false,
        };
    }

}