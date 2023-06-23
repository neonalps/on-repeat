import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { GetAllAccountTokensHandler } from "./handler";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { GetAllAccountTokensRequestDto } from "@src/models/api/get-all-account-tokens-request";
import { AccountTokenApiDto } from "@src/models/api/account-token";

export class GetAllAccountTokensRouteProvider implements RouteProvider<GetAllAccountTokensRequestDto, PaginatedResponseDto<AccountTokenApiDto>> {

    private readonly handler: GetAllAccountTokensHandler;

    constructor(handler: GetAllAccountTokensHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<GetAllAccountTokensRequestDto, PaginatedResponseDto<AccountTokenApiDto>> {
        const schema: RequestSchema = {};

        return {
            name: 'GetAllAccountTokens',
            method: 'GET',
            path: '/api/v1/account-tokens',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}