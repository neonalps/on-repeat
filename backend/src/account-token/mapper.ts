import sql from "@src/db/db";

const create = async (accountToken: CreateAccountTokenDto): Promise<number> => {
    const result = await sql`
        insert into account_token
            (account_id, oauth_provider, scope, access_token, access_token_expires_at, refresh_token, created_at)
        values
        (${ accountToken.accountId }, ${ accountToken.oauthProvider }, ${ accountToken.scope }, ${ accountToken.accessToken }, ${ accountToken.accessTokenExpiresAt }, ${ accountToken.refreshToken }, now())
        returning id
    `;

    return result[0].id;
};

const getById = async (accountTokenId: number): Promise<AccountTokenDao | null> => {
    const result = await sql<AccountTokenDao[]>`
        select
            id,
            account_id,
            oauth_provider,
            scope,
            access_token,
            access_token_expires_at,
            refresh_token,
            refresh_token_retry_count,
            created_at
        from
            account_token
        where
            id = ${ accountTokenId }
    `;

    if (!result || result.length === 0) {
        return null;
    }

    return result[0];
};

const getByAccountIdAndOauthProviderAndScope = async (accountId: string, oauthProvider: string, scope: string): Promise<AccountTokenDao | null> => {
    const result = await sql<AccountTokenDao[]>`
        select
            id,
            account_id,
            oauth_provider,
            scope,
            access_token,
            access_token_expires_at,
            refresh_token,
            refresh_token_retry_count,
            created_at
        from
            account_token
        where
            account_id = ${ accountId }
            and oauth_provider = ${ oauthProvider }
            and scope = ${ scope }
        limit 1
    `;

    if (!result || result.length === 0) {
        return null;
    }

    return result[0];
};

const mapper = {
    create,
    getByAccountIdAndOauthProviderAndScope,
    getById,
};

export default mapper;