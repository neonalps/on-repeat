import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { UpdateAccountDisplayNameRequestDto } from "@src/models/api/update-account-display-name-request";
import { UpdateAccountDisplayNameHandler } from "@src/api/v1/account/update-display-name/handler";

export class UpdateAccountDisplayNameRouteProvider implements RouteProvider<UpdateAccountDisplayNameRequestDto, void> {

    private readonly handler: UpdateAccountDisplayNameHandler;

    constructor(handler: UpdateAccountDisplayNameHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<UpdateAccountDisplayNameRequestDto, void> {
        const schema: RequestSchema = {
            body: {
                type: 'object',
                required: ['displayName'],
                properties: {
                    displayName: { 
                        type: 'string', 
                    },
                },
            },
        };

        return {
            name: 'UpdateAccountDisplayName',
            method: 'POST',
            path: '/api/v1/accounts/update-display-name',
            schema,
            handler: this.handler,
            authenticated: true,
        };
    }

}