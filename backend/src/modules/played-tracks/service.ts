import { requireNonNull } from "@src/util/common";
import { PlayedTrackMapper } from "./mapper";
import { validateNotNull } from "@src/util/validation";
import { PlayedTrackDao } from "@src/models/classes/dao/played-track";
import { CreatePlayedTrackDto } from "@src/models/classes/dto/create-played-track";
import { PlayedInfoDao } from "@src/models/classes/dao/played-info";

export class PlayedTrackService {

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

    public async getPlayedInfoForArtist(accountId: number, artistId: number): Promise<PlayedInfoDao | null> {
        validateNotNull(accountId, "accountId");
        validateNotNull(artistId, "artistId");

        return this.mapper.getPlayedInfoForArtist(accountId, artistId);
    }

}