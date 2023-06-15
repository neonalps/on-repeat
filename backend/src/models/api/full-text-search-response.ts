import { SearchResultItemApiDto } from "@src/models/api/search-result-item";

export interface FullTextSearchResponseApiDto {
    results: SearchResultItemApiDto[];
}