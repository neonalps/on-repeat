import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { AlbumMapper } from "./mapper";
import { requireNonNull } from "@src/util/common";
import { AlbumDao } from "@src/models/classes/dao/album";
import { CreateAlbumDto } from "@src/models/classes/dto/create-album";
import { UpdateAlbumDto } from "@src/models/classes/dto/update-album";

export class AlbumService {

    private readonly mapper: AlbumMapper;

    constructor(mapper: AlbumMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async create(dto: CreateAlbumDto): Promise<AlbumDao | null> {
        validateNotNull(dto, "dto");
        validateNotBlank(dto.name, "dto.name");
        validateNotNull(dto.artistIds, "dto.artistIds");
        validateNotNull(dto.images, "dto.images");
    
        const createdAlbumId = await this.mapper.create(dto);
    
        for (const artistId of dto.artistIds) {
            await this.mapper.createAlbumArtistRelation(createdAlbumId, artistId);
        }
    
        for (const albumImage of dto.images)  {
            await this.mapper.createAlbumImageRelation(createdAlbumId, albumImage);
        }
    
        return this.getById(createdAlbumId);
    }
    
    public async getById(id: number): Promise<AlbumDao | null> {
        validateNotNull(id, "id");
    
        const album = await this.mapper.getById(id);
        if (!album) {
            return null;
        }
    
        return album;
    }

    public async getMultipleById(ids: number[]): Promise<AlbumDao[]> {
        validateNotNull(ids, "ids");

        return this.mapper.getMultipleById(ids);
    }

    public async update(id: number, dto: UpdateAlbumDto): Promise<void> {
        validateNotNull(id, "id");
        validateNotNull(dto, "dto");
        validateNotBlank(dto.name, "dto.name");

        await this.mapper.update(id, dto);
    }
}