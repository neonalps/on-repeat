import sql from "@src/db/db";
import { AccountJobDao } from "@src/models/classes/dao/account-job";
import { CreateAccountJobDto } from "@src/models/classes/dto/create-account-job";
import { AccountJobDaoInterface } from "@src/models/dao/account-job.dao";

export class AccountJobMapper {

    constructor() {}

    public async create(accountJob: CreateAccountJobDto): Promise<number> {
        const result = await sql`
            insert into account_jobs
                (account_id, job_id, interval_seconds, failure_count, enabled, created_at, updated_at)
            values
                (${ accountJob.accountId }, ${ accountJob.jobId }, ${ accountJob.intervalSeconds }, 0, ${ accountJob.enabled }, now(), null)
            returning id
        `;
    
        return result[0].id;
    }

    public async getById(id: number): Promise<AccountJobDao | null> {
        const result = await sql<AccountJobDaoInterface[]>`
            select
                id,
                account_id,
                job_id,
                interval_seconds,
                failure_count,
                enabled,
                created_at,
                updated_at
            from
                account_jobs
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return AccountJobDao.fromDaoInterface(result[0]);
    }

    public async increaseFailureCount(id: number): Promise<void> {
        await sql`update account_jobs set
                     failure_count = failure_count + 1, 
                     updated_at = now() 
                   where 
                     id = ${ id }`;
    }

    public async resetFailureCount(id: number): Promise<void> {
        await sql`update account_jobs set 
                     failure_count = 0, 
                     updated_at = now() 
                   where
                     id = ${ id }`;
    }

    public async enableAccountJob(id: number): Promise<void> {
        await sql`update account_jobs set 
                    enabled = true, 
                    failure_count = 0, 
                    updated_at = now() 
                  where
                    id = ${ id }`;
    }

    public async disableAccountJob(id: number): Promise<void> {
        await sql`update account_jobs set
                     enabled = false, 
                     updated_at = now() 
                  where
                     id = ${ id }`;
    }
    
}