import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { ArtistMapper } from "@src/modules/artist/mapper";
import { requireNonNull } from "@src/util/common";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { CreateArtistDto } from "@src/models/classes/dto/create-artist";
import { UpdateArtistDto } from "@src/models/classes/dto/update-artist";
import { CreateArtistImageDto } from "@src/models/classes/dto/create-artist-image";

export class ArtistService {

    private readonly mapper: ArtistMapper;

    constructor(mapper: ArtistMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async create(dto: CreateArtistDto): Promise<ArtistDao | null> {
        validateNotNull(dto, "createArtistDto");
        validateNotBlank(dto.name, "createArtistDto.name");
    
        const createdArtistId = await this.mapper.create(dto);

        return this.getById(createdArtistId);
    }

    public async createArtistImageRelations(dtos: CreateArtistImageDto[]): Promise<void> {
        validateNotNull(dtos, "dtos");

        for (const dto of dtos) {
            validateNotNull(dto.artistId, "dto.artistId");
            validateNotNull(dto.height, "dto.height");
            validateNotNull(dto.width, "dto.width");
            validateNotBlank(dto.url, "dto.url");
        }

        await this.mapper.createArtistImageRelations(dtos);
    }

    public async getById(id: number): Promise<ArtistDao | null> {
        validateNotNull(id, "id");
    
        return this.mapper.getById(id);
    }

    public async getMultipleById(ids: number[]): Promise<ArtistDao[]> {
        validateNotNull(ids, "ids");

        return this.mapper.getMultipleById(ids);    
    }

    public async update(id: number, dto: UpdateArtistDto): Promise<void> {
        validateNotNull(id, "id");
        validateNotNull(dto, "dto");
    
        await this.mapper.update(id, dto);
    }

    public async fullTextSearch(input: string): Promise<ArtistDao[]> {
        validateNotBlank(input, "input");

        return this.mapper.fullTextSearch(input);
    }

}