import sql from "@src/db/db";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { ImageDao } from "@src/models/classes/dao/image";
import { CreateArtistDto } from "@src/models/classes/dto/create-artist";
import { CreateArtistImageDto } from "@src/models/classes/dto/create-artist-image";
import { UpdateArtistDto } from "@src/models/classes/dto/update-artist";
import { ArtistImageDaoInterface } from "@src/models/dao/artist-image.dao";
import { ArtistDaoInterface } from "@src/models/dao/artist.dao";
import { removeNull } from "@src/util/common";
import postgres, { PendingQuery, Row } from "postgres";

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

    public async createArtistImageRelation(image: CreateArtistImageDto): Promise<void> {
        await this.createArtistImageRelations([image]);
    }

    public async createArtistImageRelations(images: CreateArtistImageDto[]): Promise<void> {
        await sql`insert into artist_images ${ sql(images.map(item => item.convertToDaoInterface())) }`;
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
    
        const images = await this.getArtistImages(item.id);
        return ArtistMapper.convertResult(item, images);
    }

    public async getArtistImages(artistId: number): Promise<ImageDao[]> {
        const result = await sql<ArtistImageDaoInterface[]>`
            select
                id,
                height,
                width,
                url
            from
                artist_images
            where
                artist_id = ${ artistId }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }

        return result.map(item => ImageDao.fromInterface(item)).filter(removeNull) as ImageDao[];
    };

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
    
        return this.populateResult(result);
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

    public async fullTextSearch(input: string): Promise<ArtistDao[]> {
        const result = await sql<ArtistDaoInterface[]>`
            ${ ArtistMapper.commonArtistSelect() }
            where
                name like ${ '%' + input + '%' }
            limit
                10
        `;

        if (!result || result.length === 0) {
            return [];
        }

        return this.populateResult(result);
    }

    private static commonArtistSelect(): PendingQuery<Row[]> {
        return sql`select
                id,
                name,
                created_at,
                updated_at
            from
                artist`;
    }

    private static convertResult(item: ArtistDaoInterface, images: ImageDao[]): ArtistDao {
        return ArtistDao.Builder
            .withId(item.id)
            .withName(item.name)
            .withImages(images)
            .withCreatedAt(item.createdAt)
            .withUpdatedAt(item.updatedAt)
            .build();
    }

    private async populateResult(result: postgres.RowList<ArtistDaoInterface[]>) {
        const artists: ArtistDao[] = [];

        for (const item of result) {
            const images = await this.getArtistImages(item.id);
            artists.push(ArtistMapper.convertResult(item, images));
        }
    
        return artists;
    }
    
}
