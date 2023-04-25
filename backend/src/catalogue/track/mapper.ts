import sql from "@src/db/db";
import { TrackDao } from "@src/models/classes/dao/track";
import { CreateTrackDto } from "@src/models/classes/dto/create-track";

export class TrackMapper {

    constructor() {}

    public async create(track: CreateTrackDto): Promise<number> {
        const result = await sql`
            insert into track
                (name, album_id, isrc, disc_number, duration_ms, created_at)
            values
                (${ track.name }, ${ track.albumId }, ${ track.isrc }, ${ track.discNumber }, ${ track.durationMs }, now())
            returning id
        `;
    
        const trackId = result[0].id;
    
        for (const artistId of track.artistIds) {
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
                disc_number,
                duration_ms,
                created_at
            from
                track
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        const track = result[0];
    
        const trackArtistIds = await this.getTrackArtistIds(track.id);
    
        return TrackDao.Builder
            .withId(track.id)
            .withName(track.name)
            .withArtistIds(new Set(trackArtistIds))
            .withAlbumId(track.albumId)
            .withIsrc(track.isrc)
            .withDiscNumber(track.discNumber)
            .withDurationMs(track.durationMs)
            .withCreatedAt(track.createdAt)
            .build();
    }

    public async update(id: number, dto: UpdateTrackDto): Promise<void> {
        sql`
            update track set
                name = ${dto.getName()},
                album_id = ${dto.getAlbumId()},
                isrc = ${dto.getIsrc()},
                disc_number = ${dto.getDiscNumber()},
                duration_ms = ${dto.getDurationMs()}
            where id = ${ id }
            `;
    };

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