import sql from "@src/db/db";

const create = async (artist: CreateArtistDto): Promise<number> => {
    const result = await sql`
        insert into artist
            (name, created_at)
        values
            (${ artist.name }, now())
        returning id
    `;

    return result[0].id;
};

const getById = async (id: number): Promise<ArtistDao | null> => {
    const result = await sql<ArtistDaoInterface[]>`
        select
            id,
            name,
            created_at
        from
            artist
        where
            id = ${ id }
    `;

    if (!result || result.length === 0) {
        return null;
    }

    const item = result[0];

    return ArtistDao.fromDaoInterface(item);
};

const update = async (id: number, dto: UpdateArtistDto): Promise<number | null> => {
    const result = await sql`
        update artist set
            name = ${dto.name}
        where
            id = ${ id }
        returning id
        `;
    
    if (!result || result.length === 0) {
        return null;
    }

    return result[0].id;
};

const mapper = {
    create,
    getById,
    update,
};

export default mapper;
