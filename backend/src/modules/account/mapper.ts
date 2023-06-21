import sql from '@src/db/db';
import { AccountDao } from '@src/models/classes/dao/account';
import { CreateSecureAccountDto } from '@src/models/classes/dto/create-secure-account';
import { AccountDaoInterface } from '@src/models/dao/account.dao';

export class AccountMapper {

    constructor() {}

    public async create(account: CreateSecureAccountDto): Promise<number> {
        const result = await sql`
            insert into account
                (public_id, display_name, hashed_email, encrypted_email, enabled, created_at)
            values
                (${ account.publicId }, ${ account.displayName }, ${ account.hashedEmail }, ${ account.encryptedEmail }, ${ account.enabled }, now())
            returning id
        `;
    
        return result[0].id;
    }
    
    public async getById(id: number): Promise<AccountDao | null> {
        const result = await sql<AccountDaoInterface[]>`
            select
                id,
                public_id,
                display_name,
                hashed_email,
                encrypted_email,
                enabled,
                created_at
            from
                account
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return AccountDao.fromDaoInterface(result[0]);
    }

    public async getByPublicId(publicId: string): Promise<AccountDao | null> {
        const result = await sql<AccountDaoInterface[]>`
            select
                id,
                public_id,
                display_name,
                hashed_email,
                encrypted_email,
                enabled,
                created_at
            from
                account
            where
                public_id = ${ publicId }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return AccountDao.fromDaoInterface(result[0]);
    }
    
    public async getByHashedEmail(hashedEmail: string): Promise<AccountDao | null> {
        const result = await sql<AccountDaoInterface[]>`
            select
                id,
                public_id,
                display_name,
                hashed_email,
                encrypted_email,
                enabled,
                created_at
            from
                account
            where
                hashed_email = ${ hashedEmail }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return AccountDao.fromDaoInterface(result[0]);
    }

    public async updateDisplayName(id: number, newDisplayName: string): Promise<void> {
        await sql`
            update
                account
            set
                display_name = ${ newDisplayName },
                updated_at = now()
            where
                id = ${ id }
        `;
    }

}