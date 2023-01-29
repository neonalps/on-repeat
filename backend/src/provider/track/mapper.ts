import sql from '@db/db';

const getAll = (): Promise<TrackProviderDao[]> => {
    return sql<TrackProviderDao[]>`
        select
            id,
            name,
            display_name,
            enabled,
            created_at,
            oauth_client_id
        from
            track_provider
    `;
};

const mapper = {
    getAll
};

export default mapper;