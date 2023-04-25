import sql from "@src/db/db";

export class ArtistMapper {

    constructor() {}
    
    public async create(artist: CreateArtistDto): Promise<number> {
        const result = await sql`
            insert into artist
                (name, created_at)
            values
                (${ artist.name }, now())
            returning id
        `;
    
        return result[0].id;
    }

    public async getById(id: number): Promise<ArtistDao | null> {
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
    }

    public async update(id: number, dto: UpdateArtistDto): Promise<void> {
        await sql`
            update artist set
                name = ${dto.name}
            where
                id = ${ id }
            `;
    }
    
}
