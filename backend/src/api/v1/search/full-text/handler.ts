
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { AccountDao } from "@src/models/classes/dao/account";
import { SearchService } from "@src/modules/search/search";
import { FullTextSearchRequestDto } from "@src/models/api/full-text-search-request";
import { FullTextSearchResponseApiDto } from "@src/models/api/full-text-search-response";

export class FullTextSearchHandler implements RouteHandler<FullTextSearchRequestDto, FullTextSearchResponseApiDto> {

    private readonly searchService: SearchService;
    
    constructor(searchService: SearchService) {
        this.searchService = requireNonNull(searchService);
    }
    
    public async handle(context: AuthenticationContext, dto: FullTextSearchRequestDto): Promise<FullTextSearchResponseApiDto> {
        const accountId = (context.account as AccountDao).id;

        return {
            results: await this.searchService.fullText(dto.search, dto.pick),
        };
    }

}