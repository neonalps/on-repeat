import sql from "@src/db/db";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { CreateArtistDto } from "@src/models/classes/dto/create-artist";
import { UpdateArtistDto } from "@src/models/classes/dto/update-artist";
import { ArtistDaoInterface } from "@src/models/dao/artist.dao";

export class ArtistMapper {

    constructor() {}
    
    public async create(artist: CreateArtistDto): Promise<number> {
        const result = await sql`
            insert into artist
                (name, created_at, updated_at)
            values
                (${ artist.name }, now(), null)
            returning id
        `;
    
        return result[0].id;
    }

    public async getById(id: number): Promise<ArtistDao | null> {
        const result = await sql<ArtistDaoInterface[]>`
            select
                id,
                name,
                created_at,
                updated_at
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

    public async getMultipleById(ids: number[]): Promise<ArtistDao[]> {
        const result = await sql<ArtistDaoInterface[]>`
            select
                id,
                name,
                created_at,
                updated_at
            from
                artist
            where
                id in ${ sql(ids) }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }
    
        const artists: ArtistDao[] = [];

        for (const item of result) {
            const artist = ArtistDao.fromDaoInterface(item);

            if (!artist) {
                continue;
            }

            artists.push(artist);
        }
    
        return artists;
    }

    public async update(id: number, dto: UpdateArtistDto): Promise<void> {
        await sql`
            update artist set
                name = ${dto.name},
                updated_at = now()
            where
                id = ${ id }
            `;
    }
    
}
