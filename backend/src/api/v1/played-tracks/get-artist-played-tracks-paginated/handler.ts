
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { GetArtistPlayedTracksPaginationParams, PlayedTrackService } from "@src/modules/played-tracks/service";
import { AccountDao } from "@src/models/classes/dao/account";
import { IllegalStateError } from "@src/api/error/illegal-state-error";
import { CatalogueService } from "@src/modules/catalogue/service";
import { GetArtistPlayedTracksPaginatedRequestDto } from "@src/models/api/get-artist-played-tracks-paginated-request";
import { ArtistPlayedTrackApiDto } from "@src/models/api/artist-played-track";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { ApiHelper } from "@src/api/helper";
import { PaginationService } from "@src/modules/pagination/service";
import { SortOrder } from "@src/modules/pagination/constants";

export class GetArtistPlayedTracksPaginatedHandler implements RouteHandler<GetArtistPlayedTracksPaginatedRequestDto, PaginatedResponseDto<ArtistPlayedTrackApiDto>> {

    static readonly ERROR_ARTIST_NOT_FOUND = "No artist with this ID exists";

    private readonly apiHelper: ApiHelper;
    private readonly catalogueService :CatalogueService;
    private readonly paginationService: PaginationService;
    private readonly playedTrackService: PlayedTrackService;
    
    constructor(apiHelper: ApiHelper, catalogueService: CatalogueService, paginationService: PaginationService, playedTrackService: PlayedTrackService) {
        this.apiHelper = requireNonNull(apiHelper);
        this.catalogueService = requireNonNull(catalogueService);
        this.paginationService = requireNonNull(paginationService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }
    
    public async handle(context: AuthenticationContext, dto: GetArtistPlayedTracksPaginatedRequestDto): Promise<PaginatedResponseDto<ArtistPlayedTrackApiDto>> {
        const accountId = (context.account as AccountDao).id;
        PaginationService.validateQueryParams(dto);
        const paginationParams = this.getPaginationParams(dto);
        const artistId = dto.artistId;
        const artist = await this.catalogueService.getArtistById(artistId);

        if (!artist) {
            throw new IllegalStateError(GetArtistPlayedTracksPaginatedHandler.ERROR_ARTIST_NOT_FOUND);
        }

        const items: ArtistPlayedTrackApiDto[] = [];

        // TODO load played tracks and their statistics for this artist
        return {
            nextPageKey: this.buildNextPageKey(items, paginationParams),
            items,
        }
    }

    private getPaginationParams(dto: GetArtistPlayedTracksPaginatedRequestDto): GetArtistPlayedTracksPaginationParams {
        if (!dto.nextPageKey) {
            const order: SortOrder = dto.order === SortOrder.ASCENDING ? SortOrder.ASCENDING : SortOrder.DESCENDING;
            const limit: number = dto.limit || 50;
            const lastSeen: number = 0; // TODO fix

            return {
                order,
                limit,
                lastSeen,
                sortBy: "fix me",
            };
        }

        return this.paginationService.decode<GetArtistPlayedTracksPaginationParams>(dto.nextPageKey);
    }

    private buildNextPageKey(items: ArtistPlayedTrackApiDto[], oldParams: GetArtistPlayedTracksPaginationParams): string | undefined {
        if (items.length !== oldParams.limit) {
            return;
        }

        const newParams: GetArtistPlayedTracksPaginationParams = {
            limit: oldParams.limit,
            order: oldParams.order,
            lastSeen: PaginationService.getLastElement(items).playedAt,
        };

        return this.paginationService.encode(newParams);
    }

}