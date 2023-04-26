import { TrackDao } from "@src/models/classes/dao/track";
import { CreateTrackDto } from "@src/models/classes/dto/create-track";
import { validateNotBlank, validateNotEmpty, validateNotNull } from "@src/util/validation";
import { requireNonNull } from "@src/util/common";
import { TrackMapper } from "./mapper";

export class TrackService {

    private readonly mapper: TrackMapper;
    
    constructor(mapper: TrackMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async create(dto: CreateTrackDto): Promise<TrackDao | null> {
        validateNotNull(dto, "createTrackDto");
        validateNotBlank(dto.name, "createTrackDto.name");
        validateNotEmpty(dto.artistIds, "createTrackDto.artistIds");
    
        const createdTrackId = await this.mapper.create(dto);
        return this.getById(createdTrackId);
    };

    public async getById(id: number): Promise<TrackDao | null> {
        validateNotNull(id, "id");
    
        return this.mapper.getById(id);
    }

}