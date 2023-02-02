import sql from '@db/db';

const BASE_SELECT = `
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

const getAll = (): Promise<TrackProviderDao[]> => {
    return sql<TrackProviderDao[]>`
        ${ BASE_SELECT }
    `;
};

const getById = async (id: number): Promise<TrackProviderDao | null> => {
    const providers = await sql<TrackProviderDao[]>`
        ${ BASE_SELECT }
        where
            id = ${ id }
    `;

    if (!providers || providers.length === 0) {
        return null;
    }

    return providers[0];
};

const mapper = {
    getAll,
    getById
};

export default mapper;