import sql from "@src/db/db";
import { PlayedTrackDao } from "@src/models/classes/dao/played-track";
import { CreatePlayedTrackDto } from "@src/models/classes/dto/create-played-track";
import { PlayedTrackDaoInterface } from "@src/models/dao/played-track.dao";

export class PlayedTrackMapper {

    constructor() {}

    public async create(playedTrack: CreatePlayedTrackDto): Promise<number> {
        const result = await sql`
            insert into played_track
                (account_id, track_id, music_provider_id, played_at, include_in_statistics, created_at)
            values
                (${ playedTrack.accountId }, ${ playedTrack.trackId }, ${ playedTrack.musicProviderId }, ${ playedTrack.playedAt }, ${ playedTrack.includeInStatistics }, now())
            returning id
        `;
    
        return result[0].id;
    }
    
    public async getById(id: number): Promise<PlayedTrackDao | null> {
        const result = await sql<PlayedTrackDaoInterface[]>`
            select
                id,
                account_id,
                track_id,
                music_provider_id,
                played_at,
                include_in_statistics,
                created_at
            from
                played_track
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return PlayedTrackDao.fromDaoInterface(result[0]);
    }
    
    public async getByAccountIdAndMusicProviderIdAndPlayedAt(accountId: number, musicProviderId: number, playedAt: Date): Promise<PlayedTrackDao | null> {
        const result = await sql<PlayedTrackDaoInterface[]>`
            select
                id,
                account_id,
                track_id,
                music_provider_id,
                played_at,
                created_at
            from
                played_track
            where
                account_id = ${ accountId }
                and music_provider_id = ${ musicProviderId }
                and played_at = ${ playedAt }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return PlayedTrackDao.fromDaoInterface(result[0]);
    }

    public async getMostRecentPlayedTrackByAccountAndMusicProvider(accountId: number, musicProviderId: number): Promise<PlayedTrackDao | null> {
        const result = await sql<PlayedTrackDaoInterface[]>`
            select
                id,
                account_id,
                track_id,
                music_provider_id,
                played_at,
                created_at
            from
                played_track
            where
                account_id = ${ accountId }
                and music_provider_id = ${ musicProviderId }
            order by
                played_at desc
            limit 1
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return PlayedTrackDao.fromDaoInterface(result[0]);
    }

}