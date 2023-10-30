import sql from "@src/db/db";
import { PlayedInfoDao } from "@src/models/classes/dao/played-info";
import { PlayedTrackDao } from "@src/models/classes/dao/played-track";
import { CreatePlayedTrackDto } from "@src/models/classes/dto/create-played-track";
import { PlayedInfoDaoInterface } from "@src/models/dao/played-info.dao";
import { PlayedTrackDetailsDaoInterface } from "@src/models/dao/played-track-details.dao";
import { PlayedTrackDaoInterface } from "@src/models/dao/played-track.dao";
import { TrackBucketPlayedInfoChartDaoInterface } from "@src/models/dao/track-bucket-played-info-chart.dao";
import { isDefined, removeNull } from "@src/util/common";
import { ArtistPlayedInfoDaoInterface } from "@src/models/dao/artist-played-info.dao";
import { ChartItem } from "@src/models/interface/chart-item";
import { EntityId } from "@src/models/interface/id";
import { GetArtistPlayedTracksSortKey } from "@src/modules/played-tracks/service";
import { SortOrder } from "@src/modules/pagination/constants";
import { TrackBucketPlayedInfoDaoInterface } from "@src/models/dao/track-bucket-played-info";
import { PlayedInfoItem } from "@src/models/interface/played-info-item";
import { PlayedTrackHistoryDaoInterface } from "@src/models/dao/played-track-history.dao";
import { PlayedTrackHistoryDao } from "@src/models/classes/dao/played-track-history";
import { createIdNameDao } from "@src/util/dao";
import { IdNameDao } from "@src/models/classes/dao/id-name";
import { PlayedTrackDetailsNoAlbumImagesDao } from "@src/models/classes/dao/played-track-details-no-album-images";
import { PlayedStatsDao } from "@src/models/classes/dao/played-stats";
import { SimplePlayedStatsDaoInterface } from "@src/models/dao/simple-played-stats.dao";

export class PlayedTrackMapper {

    constructor() {}

    public async create(playedTrack: CreatePlayedTrackDto): Promise<number> {
        const result = await sql<EntityId[]>`
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

    public async getAllForAccountPaginatedDetails(orderedIds: number[]): Promise<PlayedTrackDetailsNoAlbumImagesDao[]> {
        const result = await sql<PlayedTrackDetailsDaoInterface[]>`
            select
                pt.id as played_track_id,
                t.id as track_id,
                t.name as track_name,
                alb.id as album_id,
                alb.name as album_name,
                art.id as artist_id,
                art.name as artist_name,
                mp.id as music_provider_id,
                mp.name as music_provider_name,
                pt.played_at as played_at,
                pt.include_in_statistics as include_in_statistics
            from
                played_track pt left join
                music_provider mp on mp.id = pt.music_provider_id left join
                track t on t.id = pt.track_id left join
                album alb on alb.id = t.album_id left join
                track_artists ta on t.id = ta.track_id left join
                artist art on art.id = ta.artist_id
            where
                pt.id in ${ sql(orderedIds) }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }

        return this.populateAndConvertTrackDetailsResult(result);
    }

    public async getPlayedTrackHistoryForAccountPaginated(accountId: number, trackId: number, from: Date | null, to: Date | null, lastSeenPlayedAt: Date, limit: number, order: SortOrder): Promise<PlayedTrackHistoryDao[]> {
        const sqlSortOrder = this.determineSortOrder(order);

        const result = await sql<PlayedTrackHistoryDaoInterface[]>`
            select
                pt.id as played_track_id,
                pt.played_at as played_at,
                mp.id as music_provider_id,
                mp.name as music_provider_name,
                pt.include_in_statistics as include_in_statistics
            from
                played_track pt left join
                music_provider mp on mp.id = pt.music_provider_id
            where
                pt.account_id = ${ accountId }
                and pt.track_id = ${ trackId }
                ${isDefined(from) ? this.wherePlayedAtFrom(from as Date) : sql``}
                ${isDefined(to) ? this.wherePlayedAtTo(to as Date) : sql``}
                and pt.played_at ${order === SortOrder.ASCENDING ? sql`>` : sql`<`} ${ lastSeenPlayedAt }
            order by
                pt.played_at ${ sqlSortOrder }
            limit ${limit}
        `;
    
        if (!result || result.length === 0) {
            return [];
        }

        return result
            .map(item => PlayedTrackHistoryDao.fromDaoInterface(item))
            .filter(removeNull) as PlayedTrackHistoryDao[];
    }

    public async getAllIdsForAccountPaginated(accountId: number, lastSeenPlayedAt: Date, limit: number, order: SortOrder): Promise<number[]> {
        const sqlSortOrder = this.determineSortOrder(order);

        const result = await sql<EntityId[]>`
            select
                id
            from
                played_track
            where
                account_id = ${ accountId }
                and played_at ${order === SortOrder.ASCENDING ? sql`>` : sql`<`} ${ lastSeenPlayedAt }
            order by
                played_at ${ sqlSortOrder }
            limit ${ limit }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }
    
        return result.map(item => item.id);
    }

    public async getArtistTrackBucketsOrderedOffsetPaginatedResult(accountId: number, artistId: number, from: Date | null, to: Date | null, lastSeen: number, limit: number, sortBy: GetArtistPlayedTracksSortKey, sortOrder: SortOrder): Promise<PlayedInfoItem[]> {
        const sqlSortOrder = this.determineSortOrder(sortOrder);
        
        const result = await sql<TrackBucketPlayedInfoDaoInterface[]>`
            select
                t.bucket as track_bucket,
                count(t.bucket)::int as times_played
            from
                played_track pt left join
                track_artists ta on ta.track_id = pt.track_id left join
                track t on t.id = ta.track_id
            where
                pt.account_id = ${ accountId }
                and ta.artist_id = ${ artistId }
                ${isDefined(from) ? this.wherePlayedAtFrom(from as Date) : sql``}
                ${isDefined(to) ? this.wherePlayedAtTo(to as Date) : sql``}
            group by
                t.bucket
            order by
                count(t.bucket) ${sqlSortOrder}
            offset ${lastSeen}
            limit ${limit}
        `;
    
        if (!result || result.length === 0) {
            return [];
        }

        return result.map(item => {
            return {
                itemId: item.trackBucket,
                timesPlayed: item.timesPlayed,
            };
        });
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

    public async getPlayedInfoForAlbum(accountId: number, albumId: number): Promise<PlayedInfoDao | null> {
        const result = await sql<PlayedInfoDaoInterface[]>`
            select
                min(pt.played_at) as first_played_at,
                max(pt.played_at) as last_played_at,
                count(pt.played_at)::int as times_played
            from
                played_track pt left join
                track t on t.id = pt.track_id 
            where
                pt.account_id = ${ accountId }
                and t.album_id = ${ albumId }
                and pt.include_in_statistics = true
        `;

        if (!result || result.length === 0) {
            return null;
        }

        return PlayedInfoDao.fromDaoInterface(result[0]);
    }

    public async getPlayedInfoForArtist(accountId: number, artistId: number): Promise<PlayedInfoDao | null> {
        const result = await sql<PlayedInfoDaoInterface[]>`
            select
                min(pt.played_at) as first_played_at,
                max(pt.played_at) as last_played_at,
                count(pt.played_at)::int as times_played
            from
                played_track pt left join
                track_artists ta on ta.track_id = pt.track_id 
            where
                pt.account_id = ${ accountId }
                and ta.artist_id = ${ artistId }
                and pt.include_in_statistics = true
        `;

        if (!result || result.length === 0) {
            return null;
        }

        return PlayedInfoDao.fromDaoInterface(result[0]);
    }

    public async getPlayedInfoForTrack(accountId: number, trackId: number): Promise<PlayedInfoDao | null> {
        const result = await sql<PlayedInfoDaoInterface[]>`
            select
                min(pt.played_at) as first_played_at,
                max(pt.played_at) as last_played_at,
                count(pt.played_at)::int as times_played
            from
                played_track pt
            where
                pt.account_id = ${ accountId }
                and pt.track_id = ${ trackId }
                and pt.include_in_statistics = true
        `;

        if (!result || result.length === 0) {
            return null;
        }

        return PlayedInfoDao.fromDaoInterface(result[0]);
    }

    public async getAccountTrackChartBucketIdsForPeriod(accountId: number, from: Date | null, to: Date | null, rankLimit: number): Promise<ChartItem[]> {
        const result = await sql<TrackBucketPlayedInfoChartDaoInterface[]>`
            select
                track_bucket,
                times_played,
                chart_rank::int as chart_rank
            from (
                select
                    t.bucket as track_bucket,
                    count(pt.played_at)::int as times_played,
                    rank() over (
                        order by count(pt.played_at) desc
                    ) chart_rank
                from
                    played_track pt left join
                    track t on pt.track_id = t.id
                where
                    pt.account_id = ${ accountId }
                    ${isDefined(from) ? this.wherePlayedAtFrom(from as Date) : sql``}
                    ${isDefined(to) ? this.wherePlayedAtTo(to as Date) : sql``}
                    and pt.include_in_statistics = true
                group by
                    t.bucket
                order by
                    count(pt.played_at) desc,
                    t.bucket asc
            ) rank_query
            where
                chart_rank <= ${ rankLimit }
        `;

        if (!result || result.length === 0) {
            return [];
        }

        return result.map(item => {
            return {
                rank: item.chartRank,
                itemId: item.trackBucket,
                timesPlayed: item.timesPlayed,
            };
        });
    }

    public async getAccountArtistChartForPeriod(accountId: number, from: Date | null, to: Date | null, rankLimit: number): Promise<ChartItem[]> {
        const result = await sql<ArtistPlayedInfoDaoInterface[]>`
            select
                artist_id,
                times_played,
                chart_rank::int as chart_rank
            from (
                select
                    ta.artist_id as artist_id,
                    count(pt.played_at)::int as times_played,
                    rank() over (
                        order by count(pt.played_at) desc
                    ) chart_rank
                from
                    played_track pt left join
                    track_artists ta on pt.track_id = ta.track_id left join
                    artist a on ta.artist_id = a.id
                where
                    pt.account_id = ${ accountId }
                    ${isDefined(from) ? this.wherePlayedAtFrom(from as Date) : sql``}
                    ${isDefined(to) ? this.wherePlayedAtTo(to as Date) : sql``}
                    and pt.include_in_statistics = true
                group by
                    ta.artist_id
                order by
                    count(pt.played_at) desc,
                    ta.artist_id asc
            ) rank_query
            where
                chart_rank <= ${ rankLimit }
        `;

        if (!result || result.length === 0) {
            return [];
        }

        return result.map(item => {
            return {
                rank: item.chartRank,
                itemId: item.artistId,
                timesPlayed: item.timesPlayed,
            };
        });
    }

    public async getPlayedTrackStatsForPeriod(accountId: number, from: Date | null, to: Date | null): Promise<PlayedStatsDao> {
        const result = await sql<SimplePlayedStatsDaoInterface[]>`
            select
                count(pt.played_at)::int as times_played
            from
                played_track pt
            where
                pt.account_id = ${ accountId }
                ${isDefined(from) ? this.wherePlayedAtFrom(from as Date) : sql``}
                ${isDefined(to) ? this.wherePlayedAtTo(to as Date) : sql``}
                and pt.include_in_statistics = true
        `;

        if (!result || result.length === 0) {
            return PlayedTrackMapper.convertToPlayedStatsDao(from, to, 0);
        }

        return PlayedTrackMapper.convertToPlayedStatsDao(from, to, result[0].timesPlayed);
    }

    private static convertToPlayedStatsDao(from: Date | null, to: Date | null, timesPlayed: number): PlayedStatsDao {
        return PlayedStatsDao.Builder
            .withFrom(from)
            .withTo(to)
            .withTimesPlayed(timesPlayed)
            .build();
    }

    private async populateAndConvertTrackDetailsResult(items: PlayedTrackDetailsDaoInterface[]): Promise<PlayedTrackDetailsNoAlbumImagesDao[]> {
        const playedTrackDetailsMap = new Map<number, PlayedTrackDetailsDaoInterface>();
        const trackArtistsMap = new Map<number, IdNameDao[]>();

        for (const item of items) {
            const trackId = item.trackId;
            const playedTrackId = item.playedTrackId;

            playedTrackDetailsMap.set(playedTrackId, item);

            const artistDao = IdNameDao.Builder
                .withId(item.artistId)
                .withName(item.artistName)
                .build();

            const trackArtists = trackArtistsMap.get(trackId);
            if (trackArtists) {
                if (trackArtists.findIndex(taItem => taItem.id === item.artistId) < 0) {
                    trackArtists.push(artistDao);
                }
            } else {
                trackArtistsMap.set(trackId, [artistDao]);
            }
        }

        const result: PlayedTrackDetailsNoAlbumImagesDao[] = [];
        
        for (const item of playedTrackDetailsMap.values()) {
            const album = isDefined(item.albumId) ? createIdNameDao(item.albumId, item.albumName) : null;
            const artists = trackArtistsMap.get(item.trackId);

            const dao = PlayedTrackDetailsNoAlbumImagesDao.Builder
                .withPlayedTrackId(item.playedTrackId)
                .withTrack(createIdNameDao(item.trackId, item.trackName))
                .withArtists(isDefined(artists) ? [...(artists as IdNameDao[])] : [])
                .withAlbum(album)
                .withMusicProvider(createIdNameDao(item.musicProviderId, item.musicProviderName))
                .withPlayedAt(item.playedAt)
                .withIncludeInStatistics(item.includeInStatistics)
                .build();

            result.push(dao);
        }

        return result;
    }

    private determineSortOrder(order: SortOrder) {
        return order === SortOrder.DESCENDING ? sql`desc` : sql`asc`;
    }

    private wherePlayedAtFrom(from: Date) {
        return sql`and pt.played_at >= ${from}`;
    }

    private wherePlayedAtTo(to: Date) {
        return sql`and pt.played_at < ${to}`;
    }

}