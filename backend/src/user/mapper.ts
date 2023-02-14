import sql from '@db/db';

const create = async (user: CreateUserDto): Promise<string> => {
    const result = await sql`
        insert into account
            (id, email, enabled, created_at)
        values
            (${ user.id }, ${ user.email }, ${ user.enabled }, now())
        returning id
    `;

    return result[0].id;
};

const getAll = (): Promise<UserDao[]> => {
    return sql<UserDao[]>`
        select
            id,
            email,
            enabled,
            created_at
        from
            account
    `;
};

const getById = async (id: string): Promise<UserDao | null> => {
    const result = await sql<UserDao[]>`
        select
            id,
            email,
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

    return result[0];
};

const getByEmail = async (email: string): Promise<UserDao | null> => {
    const result = await sql<UserDao[]>`
        select
            id,
            email,
            enabled,
            created_at
        from
            account
        where
            email = ${ email }
    `;

    if (!result || result.length === 0) {
        return null;
    }

    return result[0];
};

const mapper = {
    create,
    getAll,
    getByEmail,
    getById
};

export default mapper;