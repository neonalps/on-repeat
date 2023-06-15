import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { SearchService } from "@src/modules/search/search";
import { FullTextSearchHandler } from "@src/api/v1/search/full-text/handler";
import { FullTextSearchRouteProvider } from "@src/api/v1/search/full-text/route-provider";

export const getSearchRouteProviders = () => {
    const searchService = dependencyManager.get<SearchService>(Dependencies.SearchService);

    const fullTextSearchHandler = new FullTextSearchHandler(searchService);

    return [
        new FullTextSearchRouteProvider(fullTextSearchHandler),
    ];
}