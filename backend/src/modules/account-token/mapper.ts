import sql from "@src/db/db";
import { SecureAccountTokenDao } from "@src/models/classes/dao/secure-account-token";
import { CreateSecureAccountTokenDto } from "@src/models/classes/dto/create-secure-account-token";
import { AccountTokenDaoInterface } from "@src/models/dao/account-token.dao";
import { removeNull } from "@src/util/common";

export class AccountTokenMapper {

    constructor() {}

    public async create(accountToken: CreateSecureAccountTokenDto): Promise<number> {
        const result = await sql`
            insert into account_tokens
                (account_id, public_id, oauth_provider, scope, encrypted_access_token, access_token_expires_at, encrypted_refresh_token, created_at, updated_at)
            values
                (${ accountToken.accountId }, ${ accountToken.publicId }, ${ accountToken.oauthProvider }, ${ accountToken.scope }, ${ accountToken.encryptedAccessToken }, ${ accountToken.accessTokenExpiresAt }, ${ accountToken.encryptedRefreshToken }, now(), null)
            returning id
        `;
    
        return result[0].id;
    };
    
    public async getById(accountTokenId: number): Promise<SecureAccountTokenDao | null> {
        const result = await sql<AccountTokenDaoInterface[]>`
            select
                id,
                public_id,
                account_id,
                oauth_provider,
                scope,
                encrypted_access_token,
                access_token_expires_at,
                encrypted_refresh_token,
                created_at,
                updated_at
            from
                account_tokens
            where
                id = ${ accountTokenId }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return SecureAccountTokenDao.fromDaoInterface(result[0]);
    }

    public async getByAccountId(accountId: number): Promise<SecureAccountTokenDao[]> {
        const result = await sql<AccountTokenDaoInterface[]>`
            select
                id,
                public_id,
                account_id,
                oauth_provider,
                scope,
                encrypted_access_token,
                access_token_expires_at,
                encrypted_refresh_token,
                created_at,
                updated_at
            from
                account_tokens
            where
                account_id = ${ accountId }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }
    
        return result.map(item => SecureAccountTokenDao.fromDaoInterface(item))
                    .filter(removeNull) as SecureAccountTokenDao[];
    }
    
    public async getByAccountIdAndOauthProviderAndScope(accountId: number, oauthProvider: string, scope: string): Promise<SecureAccountTokenDao | null> {
        const result = await sql<AccountTokenDaoInterface[]>`
            select
                id,
                public_id,
                account_id,
                oauth_provider,
                scope,
                encrypted_access_token,
                access_token_expires_at,
                encrypted_refresh_token,
                created_at,
                updated_at
            from
                account_tokens
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
    
    public async updateAccessToken(id: number, encryptedAccessToken: string, accessTokenExpiresAt: Date): Promise<void> {
        await sql`
            update account_tokens set
                encrypted_access_token = ${ encryptedAccessToken },
                access_token_expires_at = ${ accessTokenExpiresAt },
                updated_at = now()
            where
                id = ${ id }
        `;
    }

    public async deleteByPublicId(publicId: string): Promise<void> {
        await sql`
            delete from account_tokens where public_id = ${ publicId }
        `;
    }

}