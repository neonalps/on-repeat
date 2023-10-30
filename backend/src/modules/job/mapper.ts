import sql from "@src/db/db";
import { JobDao } from "@src/models/classes/dao/job";
import { JobDaoInterface } from "@src/models/dao/job.dao";

export class JobMapper {

    constructor() {}

    public async getById(id: number): Promise<JobDao | null> {
        const result = await sql<JobDaoInterface[]>`
            select
                id,
                name,
                enabled,
                interval_ms,
                initial_delay_ms,
                created_at,
                updated_at
            from
                job
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return JobDao.fromDaoInterface(result[0]);
    }

}