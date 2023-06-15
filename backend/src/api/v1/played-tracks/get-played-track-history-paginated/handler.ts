import { MAX_DATE, MIN_DATE, SortOrder } from "@src/modules/pagination/constants";
import { PaginationService } from "@src/modules/pagination/service";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { AccountDao } from "@src/models/classes/dao/account";
import { GetPlayedTrackHistoryPaginationParams, PlayedTrackService } from "@src/modules/played-tracks/service";
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { isDefined, isNotDefined, requireNonNull } from "@src/util/common";
import { PlayedHistoryApiDto } from "@src/models/api/played-history";
import { GetPlayedTrackHistoryPaginatedRequestDto } from "@src/models/api/get-played-track-history-paginated-request";
import { PlayedTrackHistoryDao } from "@src/models/classes/dao/played-track-history";

export class GetPlayedTrackHistoryPaginatedHandler implements RouteHandler<GetPlayedTrackHistoryPaginatedRequestDto, PaginatedResponseDto<PlayedHistoryApiDto>> {

    private readonly paginationService: PaginationService;
    private readonly playedTrackService: PlayedTrackService;

    constructor(paginationService: PaginationService, playedTrackService: PlayedTrackService) {
        this.paginationService = requireNonNull(paginationService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }

    public async handle(context: AuthenticationContext, dto: GetPlayedTrackHistoryPaginatedRequestDto): Promise<PaginatedResponseDto<PlayedHistoryApiDto>> {
        const accountId = (context.account as AccountDao).id;
        this.paginationService.validateQueryParams(dto);
        const paginationParams = this.getPaginationParams(dto);
        const playedTracks = await this.playedTrackService.getPlayedTrackHistoryForAccountPaginated(accountId, dto.trackId, paginationParams);
        const items = playedTracks.map(item => this.mapToApiDto(item));

        return {
            nextPageKey: this.buildNextPageKey(items, paginationParams),
            items,
        }
    }

    private mapToApiDto(dao: PlayedTrackHistoryDao): PlayedHistoryApiDto {
        return {
            playedTrackId: dao.id,
            playedAt: dao.playedAt,
            includeInStatistics: dao.includeInStatistics,
            musicProvider: {
                id: dao.musicProviderId,
                name: dao.musicProviderName,
            },
        };
    }

    private getPaginationParams(dto: GetPlayedTrackHistoryPaginatedRequestDto): GetPlayedTrackHistoryPaginationParams {
        if (isNotDefined(dto.nextPageKey)) {
            const order: SortOrder = dto.order === SortOrder.ASCENDING ? SortOrder.ASCENDING : SortOrder.DESCENDING;
            const limit: number = isDefined(dto.limit) ? dto.limit as number : 50;
            const lastSeen: Date = order === SortOrder.ASCENDING ? MIN_DATE : MAX_DATE;

            return {
                order,
                limit,
                lastSeen,
            };
        }

        return this.paginationService.decode<GetPlayedTrackHistoryPaginationParams>(dto.nextPageKey as string);
    }

    private buildNextPageKey(items: PlayedHistoryApiDto[], oldParams: GetPlayedTrackHistoryPaginationParams): string | undefined {
        if (items.length < oldParams.limit) {
            return;
        }

        const newParams: GetPlayedTrackHistoryPaginationParams = {
            limit: oldParams.limit,
            order: oldParams.order,
            lastSeen: this.paginationService.getLastElement(items).playedAt,
        };

        return this.paginationService.encode(newParams);
    }

}