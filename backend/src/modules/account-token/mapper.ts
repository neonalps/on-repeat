import sql from "@src/db/db";
import { SecureAccountTokenDao } from "@src/models/classes/dao/secure-account-token";
import { CreateSecureAccountTokenDto } from "@src/models/classes/dto/create-secure-account-token";

export class AccountTokenMapper {

    constructor() {}

    public async create(accountToken: CreateSecureAccountTokenDto): Promise<number> {
        const result = await sql`
            insert into account_token
                (account_id, oauth_provider, scope, encrypted_access_token, access_token_expires_at, encrypted_refresh_token, created_at, updated_at)
            values
                (${ accountToken.accountId }, ${ accountToken.oauthProvider }, ${ accountToken.scope }, ${ accountToken.encryptedAccessToken }, ${ accountToken.accessTokenExpiresAt }, ${ accountToken.encryptedRefreshToken }, now(), null)
            returning id
        `;
    
        return result[0].id;
    };
    
    public async getById(accountTokenId: number): Promise<SecureAccountTokenDao | null> {
        const result = await sql<AccountTokenDaoInterface[]>`
            select
                id,
                account_id,
                oauth_provider,
                scope,
                encrypted_access_token,
                access_token_expires_at,
                encrypted_refresh_token,
                created_at,
                updated_at
            from
                account_token
            where
                id = ${ accountTokenId }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return SecureAccountTokenDao.fromDaoInterface(result[0]);
    }
    
    public async getByAccountIdAndOauthProviderAndScope(accountId: string, oauthProvider: string, scope: string): Promise<SecureAccountTokenDao | null> {
        const result = await sql<AccountTokenDaoInterface[]>`
            select
                id,
                account_id,
                oauth_provider,
                scope,
                access_token,
                access_token_expires_at,
                refresh_token,
                created_at,
                updated_at
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
    
        return SecureAccountTokenDao.fromDaoInterface(result[0])
    }
    
    // TODO add update access token
}