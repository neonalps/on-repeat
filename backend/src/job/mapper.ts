import sql from "@src/db/db";
import { JobDao } from "@src/models/classes/dao/job";
import { CreateJobDto } from "@src/models/classes/dto/create-job";
import { JobDaoInterface } from "@src/models/dao/job.dao";
import { removeNull } from "@src/util/common";

export class JobMapper {

    constructor() {}

    public async create(dto: CreateJobDto): Promise<number> {
        const result = await sql`
            insert into job
                (name, enabled, created_at, updated_at)
            values
                (${ dto.name }, ${ dto.enabled }, now(), null)
            returning id
        `;
    
        return result[0].id;
    };

    public async getById(id: number): Promise<JobDao | null> {
        const result = await sql<JobDaoInterface[]>`
            select
                id,
                name,
                enabled,
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
    
    public async getAllEnabled(): Promise<JobDao[]> {
        const result = await sql<JobDaoInterface[]>`
            select
                id,
                name,
                enabled,
                created_at,
                updated_at
            from
                job
            where
                enabled = true
        `;

        if (!result || result.length === 0) {
            return [];
        }

        return result
            .filter(removeNull)
            .map(JobDao.fromDaoInterface) as JobDao[];
    };

}