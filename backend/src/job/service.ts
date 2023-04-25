import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { JobMapper } from "./mapper";
import { requireNonNull } from "@src/util/common";
import { JobDao } from "@src/models/classes/dao/job";
import { CreateJobDto } from "@src/models/classes/dto/create-job";

export class JobService {

    private readonly mapper: JobMapper;

    constructor(mapper: JobMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async create(dto: CreateJobDto): Promise<JobDao | null> {
        validateNotNull(dto, "dto");
        validateNotBlank(dto.name, "dto.name");
        validateNotNull(dto.enabled, "dto.enabled");
    
        const createdJobId = await this.mapper.create(dto);
        return this.getById(createdJobId);
    }
    
    public async getAllEnabled(): Promise<JobDao[]> {
        return this.mapper.getAllEnabled();
    }

    public async getById(id: number): Promise<JobDao | null> {
        validateNotNull(id, "id");

        return this.mapper.getById(id);
    }

}