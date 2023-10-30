
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { isDefined, isNotDefined, requireNonNull } from "@src/util/common";
import { GetArtistPlayedTracksPaginationParams, GetArtistPlayedTracksSortKey, PlayedTrackService } from "@src/modules/played-tracks/service";
import { AccountDao } from "@src/models/classes/dao/account";
import { IllegalStateError } from "@src/api/error/illegal-state-error";
import { CatalogueService } from "@src/modules/catalogue/service";
import { GetArtistPlayedTracksPaginatedRequestDto } from "@src/models/api/get-artist-played-tracks-paginated-request";
import { ArtistPlayedTrackApiDto } from "@src/models/api/artist-played-track";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { ApiHelper } from "@src/api/helper";
import { PaginationService } from "@src/modules/pagination/service";
import { SortOrder } from "@src/modules/pagination/constants";
import { ArtistPlayedTrackDetailsDao } from "@src/models/classes/dao/artist-track-played";
import { AlbumApiDto } from "@src/models/api/album";
import { SimpleAlbumDao } from "@src/models/classes/dao/album-simple";

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
        this.paginationService.validateQueryParams(dto);
        const paginationParams = this.getPaginationParams(dto);

        const artistId = dto.artistId;
        const artist = await this.catalogueService.getArtistById(artistId);
        if (!artist) {
            throw new IllegalStateError(GetArtistPlayedTracksPaginatedHandler.ERROR_ARTIST_NOT_FOUND);
        }

        const artistTrackPlayedDetails = await this.playedTrackService.getArtistTracksOffsetPaginated(accountId, artistId, paginationParams);

        const items = artistTrackPlayedDetails.map(item => this.mapToApiDto(item));

        return {
            nextPageKey: this.buildNextPageKey(items, paginationParams),
            items,
        }
    }

    private mapToApiDto(item: ArtistPlayedTrackDetailsDao): ArtistPlayedTrackApiDto {
        return {
            id: item.track.id,
            name: item.track.name,
            href: this.apiHelper.getTrackResourceUrl(item.track.id),
            album: this.mapAlbumApiDto(item.album),
            additionalArtists: this.apiHelper.convertArtistApiDtos(Array.from(item.additionalArtists)),
            timesPlayed: item.timesPlayed,
        };
    }

    private mapAlbumApiDto(album: SimpleAlbumDao | null): AlbumApiDto | null {
        if (album === null) {
            return null;
        }

        return {
            id: album.id,
            name: album.name,
            href: this.apiHelper.getAlbumResourceUrl(album.id),
            images: this.apiHelper.convertImageApiDtos(Array.from(album.images)),
        };
    }

    private getPaginationParams(dto: GetArtistPlayedTracksPaginatedRequestDto): GetArtistPlayedTracksPaginationParams {
        if (isNotDefined(dto.nextPageKey)) {
            const order: SortOrder = dto.order === SortOrder.ASCENDING ? SortOrder.ASCENDING : SortOrder.DESCENDING;
            const limit: number = isDefined(dto.limit) ? dto.limit as number : 50;
            const lastSeen: number = 0;
            const sortBy = isDefined(dto.sortBy) ? dto.sortBy as GetArtistPlayedTracksSortKey : GetArtistPlayedTracksSortKey.TIMES_PLAYED;

            return {
                order,
                limit,
                lastSeen,
                sortBy,
            };
        }

        return this.paginationService.decode<GetArtistPlayedTracksPaginationParams>(dto.nextPageKey as string);
    }

    private buildNextPageKey(items: ArtistPlayedTrackApiDto[], oldParams: GetArtistPlayedTracksPaginationParams): string | undefined {
        if (items.length < oldParams.limit) {
            return;
        }

        const newParams: GetArtistPlayedTracksPaginationParams = {
            limit: oldParams.limit,
            order: oldParams.order,
            lastSeen: oldParams.lastSeen + items.length,
            sortBy: oldParams.sortBy,
        };

        return this.paginationService.encode(newParams);
    }

}