import { requireNonNull } from "@src/util/common";
import { PlayedTrackMapper } from "./mapper";
import { validateNotNull } from "@src/util/validation";
import { PlayedTrackDao } from "@src/models/classes/dao/played-track";
import { CreatePlayedTrackDto } from "@src/models/classes/dto/create-played-track";
import { PlayedInfoDao } from "@src/models/classes/dao/played-info";
import { PaginationParams, SortOrder } from "@src/modules/pagination/constants";
import { PlayedTrackDetailsDao } from "@src/models/classes/dao/played-track-details";
import { DateUtils } from "@src/util/date";

export interface GetPlayedTracksPaginationParams extends PaginationParams<Date> {}

export class PlayedTrackService {

    static readonly EMPTY_PLAYED_INFO = PlayedInfoDao.Builder
        .withFirstPlayedAt(null)
        .withLastPlayedAt(null)
        .withTimesPlayed(0)
        .build();

    private readonly mapper: PlayedTrackMapper;

    constructor(mapper: PlayedTrackMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async create(dto: CreatePlayedTrackDto): Promise<PlayedTrackDao | null> {
        validateNotNull(dto, "dto");
        validateNotNull(dto.accountId, "dto.accountId");
        validateNotNull(dto.trackId, "dto.trackId");
        validateNotNull(dto.musicProviderId, "dto.musicProviderId");
        validateNotNull(dto.playedAt, "dto.playedAt");
        validateNotNull(dto.includeInStatistics, "dto.includeInStatistics");

        const createdPlayedTrackId = await this.mapper.create(dto);

        if (!createdPlayedTrackId) {
            throw new Error("failed to create played track");
        }

        return this.getById(createdPlayedTrackId);
    }

    public async getById(id: number): Promise<PlayedTrackDao | null> {
        validateNotNull(id, "id");

        return this.mapper.getById(id);
    }

    public async getAllForAccountPaginated(accountId: number, paginationParams: GetPlayedTracksPaginationParams): Promise<PlayedTrackDetailsDao[]> {
        validateNotNull(accountId, "accountId");
        validateNotNull(paginationParams, "paginationParams");
        validateNotNull(paginationParams.limit, "paginationParams.limit");
        validateNotNull(paginationParams.order, "paginationParams.order");
        validateNotNull(paginationParams.lastSeen, "paginationParams.lastSeen");

        const orderedIds = await this.getOrderedPaginatedResult(accountId, paginationParams.lastSeen, paginationParams.limit, paginationParams.order);

        const playedTrackDetails = await this.mapper.getAllForAccountPaginatedDetails(orderedIds);
        
        return playedTrackDetails.sort(PlayedTrackService.playedAtComparator(paginationParams.order));
    }

    private async getOrderedPaginatedResult(accountId: number, lastSeenPlayedAt: Date, limit: number, order: SortOrder): Promise<number[]> {
        if (order === SortOrder.DESCENDING) {
            return this.mapper.getAllIdsForAccountPaginatedDescending(accountId, lastSeenPlayedAt, limit);
        }

        return this.mapper.getAllIdsForAccountPaginatedAscending(accountId, lastSeenPlayedAt, limit);
    }

    public async hasPlayedTrackAlreadyBeenProcessed(accountId: number, musicProviderId: number, playedAt: Date): Promise<boolean> {
        validateNotNull(accountId, "accountId");
        validateNotNull(musicProviderId, "musicProviderId");
        validateNotNull(playedAt, "playedAt");
    
        const playedTrack = await this.mapper.getByAccountIdAndMusicProviderIdAndPlayedAt(accountId, musicProviderId, playedAt);
        return playedTrack !== null;
    }

    public async getMostRecentPlayedTrackByAccountAndMusicProvider(accountId: number, musicProviderId: number): Promise<PlayedTrackDao | null> {
        validateNotNull(accountId, "accountId");
        validateNotNull(musicProviderId, "musicProviderId");

        return this.mapper.getMostRecentPlayedTrackByAccountAndMusicProvider(accountId, musicProviderId);
    }

    public async getPlayedInfoForAlbum(accountId: number, albumId: number): Promise<PlayedInfoDao> {
        validateNotNull(accountId, "accountId");
        validateNotNull(albumId, "albumId");

        const playedInfo = await this.mapper.getPlayedInfoForAlbum(accountId, albumId); 

        if (playedInfo === null) {
            return PlayedTrackService.EMPTY_PLAYED_INFO;
        }

        return playedInfo;
    }

    public async getPlayedInfoForArtist(accountId: number, artistId: number): Promise<PlayedInfoDao> {
        validateNotNull(accountId, "accountId");
        validateNotNull(artistId, "artistId");

        const playedInfo = await this.mapper.getPlayedInfoForArtist(accountId, artistId); 

        if (playedInfo === null) {
            return PlayedTrackService.EMPTY_PLAYED_INFO;
        }

        return playedInfo;
    }

    public async getPlayedInfoForTrack(accountId: number, trackId: number): Promise<PlayedInfoDao> {
        validateNotNull(accountId, "accountId");
        validateNotNull(trackId, "trackId");

        const playedInfo = await this.mapper.getPlayedInfoForTrack(accountId, trackId); 

        if (playedInfo === null) {
            return PlayedTrackService.EMPTY_PLAYED_INFO;
        }

        return playedInfo;
    }

    private static playedAtComparator(sortOrder: SortOrder): ((a: PlayedTrackDetailsDao, b: PlayedTrackDetailsDao) => number) | undefined {
        return (a, b) => {
            const first = DateUtils.getUnixTimestampFromDate(a.playedAt);
            const second = DateUtils.getUnixTimestampFromDate(b.playedAt);

            if (sortOrder === SortOrder.ASCENDING) {
                return first - second;
            }

            return second - first;
        };
    }

}