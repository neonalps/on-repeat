import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { ArtistMapper } from "./mapper";
import { requireNonNull } from "@src/util/common";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { CreateArtistDto } from "@src/models/classes/dto/create-artist";
import { UpdateArtistDto } from "@src/models/classes/dto/update-artist";

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

    public async getById(id: number): Promise<ArtistDao | null> {
        validateNotNull(id, "id");
    
        const artist = await this.mapper.getById(id);
        
        if (!artist) {
            return null;
        }
    
        return artist;
    }

    public async getMultipleById(ids: Set<number>): Promise<ArtistDao[]> {
        validateNotNull(ids, "ids");

        return this.mapper.getMultipleById(Array.from(ids));    
    }

    public async update(id: number, dto: UpdateArtistDto): Promise<void> {
        validateNotNull(id, "id");
        validateNotNull(dto, "dto");
    
        await this.mapper.update(id, dto);
    }

}