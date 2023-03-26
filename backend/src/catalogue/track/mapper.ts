import sql from "@src/db/db";

const create = async (track: CreateTrackDto): Promise<number> => {
    const result = await sql`
        insert into track
            (name, album_id, isrc, disc_number, duration_ms, created_at)
        values
            (${ track.getName() }, ${ track.getAlbumId() }, ${ track.getIsrc() }, ${ track.getDiscNumber() }, ${ track.getDurationMs() }, now())
        returning id
    `;

    return result[0].id;
};

const createTrackArtistRelation = async (trackId: number, artistId: number): Promise<number> => {
    const result = await sql`
        insert into track_artists
            (track_id, artist_id)
        values
            (${ trackId }, ${ artistId })
        returning id
    `;

    return result[0].id;
};

const getById = async (id: number): Promise<TrackDao | null> => {
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

    const item = result[0];

    return new TrackDaoBuilder()
        .setId(item.id)
        .setName(item.name)
        .setAlbumId(item.albumId)
        .setIsrc(item.isrc)
        .setDiscNumber(item.discNumber)
        .setDurationMs(item.durationMs)
        .setCreatedAt(item.createdAt)
        .build();
};

const getTrackArtistIds = async (trackId: number): Promise<number[]> => {
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
};

const update = async (id: number, dto: UpdateTrackDto): Promise<void> => {
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

const mapper = {
    create,
    createTrackArtistRelation,
    getById,
    getTrackArtistIds,
    update,
};

export default mapper;
