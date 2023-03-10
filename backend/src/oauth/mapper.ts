import sql from '@db/db';

const getAll = (): Promise<OauthClientDao[]> => {
    return sql<OauthClientDao[]>`
        select
            id,
            name,
            client_id,
            client_secret,
            grant_type,
            scope,
            authorize_url,
            authorize_redirect_url,
            refresh_token_url,
            state_provider,
            created_at
        from
            oauth_client
    `;
};

const getById = async (id: number): Promise<OauthClientDao | null> => {
    const clients = await sql<OauthClientDao[]>`
        select
            id,
            name,
            client_id,
            client_secret,
            grant_type,
            scope,
            authorize_url,
            authorize_redirect_url,
            refresh_token_url,
            state_provider,
            created_at
        from
            oauth_client
        where
            id = ${ id }
    `;

    if (!clients || clients.length === 0) {
        return null;
    }

    return clients[0];
};

const mapper = {
    getAll,
    getById
};

export default mapper;