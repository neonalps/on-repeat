import { requireNonNull } from "@src/util/common";
import { CatalogueService } from "@src/modules/catalogue/service";
import { SimpleTrackDetailsDao } from "@src/models/classes/dao/simple-track-details";
import { SearchResultItemApiDto } from "@src/models/api/search-result-item";
import { ApiHelper } from "@src/api/helper";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { ArtistApiDto } from "@src/models/api/artist";

export enum SearchPickOptions {
    ALBUMS = 'ALBUMS',
    ARTISTS = 'ARTISTS',
    TRACKS = 'TRACKS',
};

export class SearchService {

    private readonly apiHelper: ApiHelper;
    private readonly catalogueService: CatalogueService;

    constructor(apiHelper: ApiHelper, catalogueService: CatalogueService) {
        this.apiHelper = requireNonNull(apiHelper);
        this.catalogueService = requireNonNull(catalogueService);
    }

    public async fullText(input: string, pick: SearchPickOptions[]): Promise<SearchResultItemApiDto[]> {
        const [tracks, artists] = await Promise.all([
            this.catalogueService.searchTracksFullText(input),
            this.catalogueService.searchArtistsFullText(input),
        ]);

        return [
            ...tracks.map(track => this.convertTrackItem(track)),
            ...artists.map(artist => this.convertArtistItem(artist)),
        ];
    }

    private convertTrackItem(item: SimpleTrackDetailsDao): SearchResultItemApiDto {
        return {
            type: 'track',
            item: this.apiHelper.convertToTrackApiDtoFromSimpleTrackDetails(item),
        };
    }

    private convertArtistItem(item: ArtistDao): SearchResultItemApiDto {
        return {
            type: 'artist',
            item: this.apiHelper.convertArtistApiDto(item) as ArtistApiDto,
        };
    }
}