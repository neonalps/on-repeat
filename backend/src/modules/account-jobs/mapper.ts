import sql from "@src/db/db";
import { AccountJobDao } from "@src/models/classes/dao/account-job";
import { CreateAccountJobDto } from "@src/models/classes/dto/create-account-job";
import { AccountJobDaoInterface } from "@src/models/dao/account-job.dao";

export class AccountJobMapper {

    constructor() {}

    public async create(accountJob: CreateAccountJobDto): Promise<number> {
        const result = await sql`
            insert into account_jobs
                (account_id, job_id, interval_seconds, enabled, created_at, updated_at)
            values
                (${ accountJob.accountId }, ${ accountJob.jobId }, ${ accountJob.intervalSeconds }, ${ accountJob.enabled }, now(), null)
            returning id
        `;
    
        return result[0].id;
    };

    public async getById(id: number): Promise<AccountJobDao | null> {
        const result = await sql<AccountJobDaoInterface[]>`
            select
                id,
                account_id,
                job_id,
                interval_seconds,
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
    
}