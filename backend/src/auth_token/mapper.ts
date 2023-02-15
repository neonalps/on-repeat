import sql from "@src/db/db";

const getByAccountIdAndOauthProvider = async (accountId: string, oauthProvider: string): Promise<AccountTokenDao | null> => {
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
        limit 1
    `;

    if (!result || result.length === 0) {
        return null;
    }

    return result[0];
};

const mapper = {
    getByAccountIdAndOauthProvider,
};

export default mapper;