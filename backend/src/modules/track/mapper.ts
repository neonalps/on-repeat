import sql from "@src/db/db";
import { TrackDao } from "@src/models/classes/dao/track";
import { CreateTrackDto } from "@src/models/classes/dto/create-track";
import { UpdateTrackDto } from "@src/models/classes/dto/update-track";
import { TrackArtistDaoInterface } from "@src/models/dao/track-artist.dao";
import { TrackDaoInterface } from "@src/models/dao/track.dao";

export class TrackMapper {

    constructor() {}

    public async create(dto: CreateTrackDto): Promise<number> {
        const result = await sql`
            insert into track
                (name, album_id, isrc, disc_number, track_number, duration_ms, explicit, created_at, updated_at)
            values
                (${ dto.name }, ${ dto.albumId }, ${ dto.isrc }, ${ dto.discNumber }, ${ dto.trackNumber }, ${ dto.durationMs }, ${ dto.explicit }, now(), null)
            returning id
        `;
    
        const trackId = result[0].id;
    
        for (const artistId of dto.artistIds) {
            await this.createTrackArtistRelation(trackId, artistId);
        }
    
        return trackId;
    }

    public async createTrackArtistRelation(trackId: number, artistId: number): Promise<number> {
        const result = await sql`
            insert into track_artists
                (track_id, artist_id)
            values
                (${ trackId }, ${ artistId })
            returning id
        `;
    
        return result[0].id;
    }

    public async getById(id: number): Promise<TrackDao | null> {
        const result = await sql<TrackDaoInterface[]>`
            select
                id,
                name,
                album_id,
                isrc,
                bucket,
                disc_number,
                track_number,
                duration_ms,
                explicit,
                created_at,
                updated_at
            from
                track
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        const item = result[0];
    
        const trackArtistIds = await this.getTrackArtistIds(item.id);
    
        return TrackMapper.convertToDao(item, trackArtistIds);
    }

    public async getMultipleById(ids: number[]): Promise<TrackDao[]> {
        const result = await sql<TrackDaoInterface[]>`
            select
                id,
                name,
                album_id,
                isrc,
                bucket,
                disc_number,
                track_number,
                duration_ms,
                explicit,
                created_at,
                updated_at
            from
                track
            where
                id in ${ sql(ids) }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }

        const tracks = [];
        for (const item of result) {
            const trackArtistIds = await this.getTrackArtistIds(item.id);
            tracks.push(TrackMapper.convertToDao(item, trackArtistIds));
        }
        return tracks;
    }

    public async update(id: number, dto: UpdateTrackDto): Promise<void> {
        await sql`
            update track set
                name = ${ dto.name },
                isrc = ${ dto.isrc },
                disc_number = ${ dto.discNumber },
                track_number = ${ dto.trackNumber },
                explicit = ${ dto.explicit },
                duration_ms = ${ dto.durationMs },
                updated_at = now()
            where id = ${ id }
            `;
    };

    public async updateBucket(id: number, newBucket: number): Promise<void> {
        await sql`
            update track set
                bucket = ${ newBucket },
                updated_at = now()
            where id = ${ id }
            `;
    }

    private static convertToDao(item: TrackDaoInterface, artistIds: number[]): TrackDao {
        return TrackDao.Builder
            .withId(item.id)
            .withName(item.name)
            .withArtistIds(new Set(artistIds))
            .withAlbumId(item.albumId)
            .withIsrc(item.isrc)
            .withBucket(item.bucket)
            .withDiscNumber(item.discNumber)
            .withTrackNumber(item.trackNumber)
            .withDurationMs(item.durationMs)
            .withExplicit(item.explicit)
            .withCreatedAt(item.createdAt)
            .withUpdatedAt(item.updatedAt)
            .build();
    }

    private async getTrackArtistIds(trackId: number): Promise<number[]> {
        const result = await sql<TrackArtistDaoInterface[]>`
            select
                id,
                track_id,
                artist_id
            from
                track_artists
            where
                track_id = ${ trackId }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }
    
        return result.map(item => item.artistId);
    }
}