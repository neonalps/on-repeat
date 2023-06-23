import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { DeleteAccountTokenByIdRequestDto } from "@src/models/api/delete-account-token-by-id-request";
import { DeleteAccountTokenByIdHandler } from "@src/api/v1/account-token/delete-by-id/handler";

export class DeleteAccountTokenByIdRouteProvider implements RouteProvider<DeleteAccountTokenByIdRequestDto, void> {

    private readonly handler: DeleteAccountTokenByIdHandler;

    constructor(handler: DeleteAccountTokenByIdHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<DeleteAccountTokenByIdRequestDto, void> {
        const schema: RequestSchema = {
            params: {
                type: 'object',
                required: ['publicId'],
                properties: {
                    publicId: { type: 'string' },
                },
            }
        };

        return {
            name: 'DeleteAccountTokenById',
            method: 'DELETE',
            path: '/api/v1/account-tokens/:publicId',
            schema, 
            handler: this.handler,
            authenticated: true,
        };
    }

}