import { MAX_DATE, MIN_DATE, SortOrder } from "@src/modules/pagination/constants";
import { PaginationService } from "@src/modules/pagination/service";
import { GetPlayedTracksPaginatedRequestDto } from "@src/models/api/get-played-tracks-paginated-request";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { PlayedTrackApiDto } from "@src/models/api/played-track";
import { AccountDao } from "@src/models/classes/dao/account";
import { GetPlayedTracksPaginationParams, PlayedTrackService } from "@src/modules/played-tracks/service";
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { PlayedTrackDetailsDao } from "@src/models/classes/dao/played-track-details";

export class GetPlayedTracksPaginatedHandler implements RouteHandler<GetPlayedTracksPaginatedRequestDto, PaginatedResponseDto<PlayedTrackApiDto>> {

    private readonly paginationService: PaginationService;
    private readonly playedTrackService: PlayedTrackService;

    constructor(paginationService: PaginationService, playedTrackService: PlayedTrackService) {
        this.paginationService = requireNonNull(paginationService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }

    public async handle(context: AuthenticationContext, dto: GetPlayedTracksPaginatedRequestDto): Promise<PaginatedResponseDto<PlayedTrackApiDto>> {
        const accountId = (context.account as AccountDao).id;
        PaginationService.validateQueryParams(dto);
        const paginationParams = this.getPaginationParams(dto);
        const playedTracks = await this.playedTrackService.getAllForAccountPaginated(accountId, paginationParams);
        const items = playedTracks.map(GetPlayedTracksPaginatedHandler.mapPlayedTrackDetailDaoToApiDto);

        return {
            nextPageKey: this.buildNextPageKey(items, paginationParams),
            items,
        }
    }

    private static mapPlayedTrackDetailDaoToApiDto(item: PlayedTrackDetailsDao): PlayedTrackApiDto {
        const artists = [];

        for (const artist of item.artists) {
            artists.push({
                id: artist.id,
                name: artist.name,
            });
        }

        return {
            playedAt: item.playedAt,
            track: {
                id: item.trackId,
                name: item.trackName,
                artists,
                album: {
                    id: item.albumId,
                    name: item.albumName,
                },
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
        if (items.length !== oldParams.limit) {
            return;
        }

        const newParams: GetPlayedTracksPaginationParams = {
            limit: oldParams.limit,
            order: oldParams.order,
            lastSeen: PaginationService.getLastElement(items).playedAt,
        };

        return this.paginationService.encode(newParams);
    }

}