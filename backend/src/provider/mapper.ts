import sql from "@src/db/db";

const create = async (playedTrack: CreatePlayedTrackDto): Promise<number> => {
    const result = await sql`
        insert into played_track
            (account_id, track_id, music_provider_id, played_at, created_at)
        values
            (${ playedTrack.getAccountId() }, ${ playedTrack.getTrackId() }, ${ playedTrack.getMusicProviderId() }, ${ playedTrack.getPlayedAt() }, now())
        returning id
    `;

    return result[0].id;
};

const getById = async (id: number): Promise<PlayedTrackDao | null> => {
    const result = await sql<PlayedTrackDaoInterface[]>`
        select
            id,
            account_id,
            track_id,
            music_provider_id,
            played_at,
            created_at
        from
            account
        where
            id = ${ id }
    `;

    if (!result || result.length === 0) {
        return null;
    }

    const item = result[0];

    return new PlayedTrackDaoBuilder()
        .setId(item.id)
        .setAccountId(item.accountId)
        .setTrackId(item.trackId)
        .setMusicProviderId(item.musicProviderId)
        .setPlayedAt(item.playedAt)
        .setCreatedAt(item.createdAt)
        .build();
};

const getByAccountIdAndMusicProviderIdAndPlayedAt = async (accountId: number, musicProviderId: number, playedAt: Date): Promise<PlayedTrackDao | null> => {
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

    const playedTrack = result[0];

    return new PlayedTrackDaoBuilder()
        .setId(playedTrack.id)
        .setAccountId(playedTrack.accountId)
        .setTrackId(playedTrack.trackId)
        .setMusicProviderId(playedTrack.musicProviderId)
        .setPlayedAt(playedTrack.playedAt)
        .setCreatedAt(playedTrack.createdAt)
        .build();
};

const mapper = {
    create,
    getById,
    getByAccountIdAndMusicProviderIdAndPlayedAt,
};

export default mapper;