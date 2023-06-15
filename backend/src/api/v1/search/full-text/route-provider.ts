import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { FullTextSearchHandler } from "@src/api/v1/search/full-text/handler";
import { SearchPickOptions } from "@src/modules/search/search";
import { FullTextSearchRequestDto } from "@src/models/api/full-text-search-request";
import { FullTextSearchResponseApiDto } from "@src/models/api/full-text-search-response";

export class FullTextSearchRouteProvider implements RouteProvider<FullTextSearchRequestDto, FullTextSearchResponseApiDto> {

    private readonly handler: FullTextSearchHandler

    constructor(handler: FullTextSearchHandler) {
        this.handler = requireNonNull(handler);
    }

    provide(): RouteDefinition<FullTextSearchRequestDto, FullTextSearchResponseApiDto> {
        const schema: RequestSchema = {
            body: {
                type: 'object',
                required: ['search'],
                properties: {
                    search: { type: 'string' },
                    pick: { type: 'array', items: { type: 'string', enum: [SearchPickOptions.ALBUMS, SearchPickOptions.ARTISTS, SearchPickOptions.TRACKS] } },
                },
            }
        };

        return {
            name: 'FullTextSearch',
            method: 'POST',
            path: '/api/v1/search',
            schema,
            handler: this.handler,
            authenticated: true,
            response: {
                statusCode: 200,
            },
        };
    }

}