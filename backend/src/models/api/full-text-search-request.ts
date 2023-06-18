import { SearchPickOptions } from "@src/modules/search/search";

export interface FullTextSearchRequestDto {
    search: string;
    pick: SearchPickOptions[];
}