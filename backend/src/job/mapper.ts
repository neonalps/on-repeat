import sql from "@src/db/db";

const create = async (dto: CreateJobDto): Promise<JobDao> => {
    const result = await sql`
        insert into job
            (account_id, name, interval_seconds, enabled)
        values
            (${ dto.accountId }, ${ dto.name }, ${ dto.intervalSeconds }, ${ dto.enabled })
        returning id
    `;

    return result[0].id;
};

const getAllEnabled = async (): Promise<JobDao[]> => {
    return sql<JobDao[]>`
        select
            id,
            account_id,
            name,
            interval_seconds,
            enabled,
            created_at,
            updated_at
        from
            job
        where
            enabled = true
    `;
};

const mapper = {
    create,
    getAllEnabled,
};

export default mapper;