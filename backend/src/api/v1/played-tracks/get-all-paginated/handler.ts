import { MAX_DATE, MIN_DATE, SortOrder } from "@src/modules/pagination/constants";
import { PaginationService } from "@src/modules/pagination/service";
import { GetPlayedTracksPaginatedRequestDto } from "@src/models/api/get-played-tracks-paginated-request";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { PlayedTrackApiDto } from "@src/models/api/played-track";
import { AccountDao } from "@src/models/classes/dao/account";
import { GetPlayedTracksPaginationParams, PlayedTrackService } from "@src/modules/played-tracks/service";
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { isDefined, requireNonNull } from "@src/util/common";
import { PlayedTrackDetailsDao } from "@src/models/classes/dao/played-track-details";
import { ApiHelper } from "@src/api/helper";
import { AlbumApiDto } from "@src/models/api/album";
import { SimpleAlbumDao } from "@src/models/classes/dao/album-simple";

export class GetPlayedTracksPaginatedHandler implements RouteHandler<GetPlayedTracksPaginatedRequestDto, PaginatedResponseDto<PlayedTrackApiDto>> {

    private readonly apiHelper: ApiHelper;
    private readonly paginationService: PaginationService;
    private readonly playedTrackService: PlayedTrackService;

    constructor(apiHelper: ApiHelper, paginationService: PaginationService, playedTrackService: PlayedTrackService) {
        this.apiHelper = requireNonNull(apiHelper);
        this.paginationService = requireNonNull(paginationService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }

    public async handle(context: AuthenticationContext, dto: GetPlayedTracksPaginatedRequestDto): Promise<PaginatedResponseDto<PlayedTrackApiDto>> {
        const accountId = (context.account as AccountDao).id;
        this.paginationService.validateQueryParams(dto);
        const paginationParams = this.getPaginationParams(dto);
        const playedTracks = await this.playedTrackService.getAllForAccountPaginated(accountId, paginationParams);
        const items = playedTracks.map(item => this.mapPlayedTrackDetailDaoToApiDto(item));

        return {
            nextPageKey: this.buildNextPageKey(items, paginationParams),
            items,
        }
    }

    private mapPlayedTrackDetailDaoToApiDto(item: PlayedTrackDetailsDao): PlayedTrackApiDto {
        let albumApiDto: AlbumApiDto | null = null;

        if (isDefined(item.album)) {
            const album = item.album as SimpleAlbumDao;

            albumApiDto = {
                id: album.id,
                name: album.name,
                href: this.apiHelper.getAlbumResourceUrl(album.id),
                images: this.apiHelper.convertImageApiDtos(Array.from(album.images)),
            }
        }

        return {
            playedTrackId: item.playedTrackId,
            playedAt: item.playedAt,
            includeInStatistics: item.includeInStatistics,
            track: {
                id: item.track.id,
                name: item.track.name,
                href: this.apiHelper.getTrackResourceUrl(item.track.id),
                artists: this.apiHelper.convertArtistApiDtos(Array.from(item.artists)),
                album: albumApiDto,
            },
            musicProvider: {
                id: item.musicProvider.id,
                name: item.musicProvider.name,
            },
        };
    }

    private getPaginationParams(dto: GetPlayedTracksPaginatedRequestDto): GetPlayedTracksPaginationParams {
        if (!dto.nextPageKey) {
            const order: SortOrder = dto.order === SortOrder.ASCENDING ? SortOrder.ASCENDING : SortOrder.DESCENDING;
            const limit: number = dto.limit || 50;
            const lastSeen: Date = order === SortOrder.ASCENDING ? MIN_DATE : MAX_DATE;

            return {
                order,
                limit,
                lastSeen,
            };
        }

        return this.paginationService.decode<GetPlayedTracksPaginationParams>(dto.nextPageKey);
    }

    private buildNextPageKey(items: PlayedTrackApiDto[], oldParams: GetPlayedTracksPaginationParams): string | undefined {
        if (items.length < oldParams.limit) {
            return;
        }

        const newParams: GetPlayedTracksPaginationParams = {
            limit: oldParams.limit,
            order: oldParams.order,
            lastSeen: this.paginationService.getLastElement(items).playedAt,
        };

        return this.paginationService.encode(newParams);
    }

}