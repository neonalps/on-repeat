import sql from '@db/db';

const getAll = (): Promise<TrackProviderDao[]> => {
    return sql<TrackProviderDao[]>`
        select
            id,
            name,
            display_name,
            enabled,
            created_at,
            auth_provider_id
        from
            track_providers
    `;
};

const mapper = {
    getAll
};

export default mapper;