import { TrackDao } from "@src/models/classes/dao/track";
import { CreateTrackDto } from "@src/models/classes/dto/create-track";
import { validateNotBlank, validateNotEmpty, validateNotNull, validateTrue } from "@src/util/validation";
import { requireNonNull } from "@src/util/common";
import { TrackMapper } from "./mapper";
import { UpdateTrackDto } from "@src/models/classes/dto/update-track";

export class TrackService {

    private readonly mapper: TrackMapper;
    
    constructor(mapper: TrackMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async create(dto: CreateTrackDto): Promise<TrackDao | null> {
        validateNotNull(dto, "createTrackDto");
        validateNotBlank(dto.name, "createTrackDto.name");
        validateTrue(dto.artistIds !== null && dto.artistIds.length > 0, "createTrackDto.artistIds");
    
        const createdTrackId = await this.mapper.create(dto);

        return this.getById(createdTrackId);
    };

    public async getById(id: number): Promise<TrackDao | null> {
        validateNotNull(id, "id");
    
        return this.mapper.getById(id);
    }

    public async getMultipleById(ids: Set<number>): Promise<TrackDao[]> {
        validateNotNull(ids, "ids");

        return this.mapper.getMultipleById(Array.from(ids));
    }

    public async getByIsrc(isrc: string): Promise<TrackDao[]> {
        validateNotBlank(isrc, "isrc");

        return this.mapper.getByIsrc(isrc);
    }

    public async update(id: number, dto: UpdateTrackDto): Promise<void> {
        validateNotNull(id, "id");
        validateNotNull(dto, "dto");
        validateNotBlank(dto.name, "dto.name");

        await this.mapper.update(id, dto);
    }

    public async updateBucket(id: number, newBucket: number): Promise<void> {
        validateNotNull(id, "id");
        validateNotNull(newBucket, "newBucket");

        await this.mapper.updateBucket(id, newBucket);
    }

    public async fullTextSearch(input: string): Promise<TrackDao[]> {
        validateNotBlank(input, "input");

        return this.mapper.fullTextSearch(input);
    }

}