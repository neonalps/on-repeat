import { requireNonNull } from "@src/util/common";
import { CatalogueService } from "@src/modules/catalogue/service";

export enum SearchPickOptions {
    ALBUMS = 'ALBUMS',
    ARTISTS = 'ARTISTS',
    TRACKS = 'TRACKS',
};

export class SearchService {

    private readonly catalogueService: CatalogueService;

    constructor(catalogueService: CatalogueService) {
        this.catalogueService = requireNonNull(catalogueService);
    }

    public async fullText(): Promise<void> {

    }

}