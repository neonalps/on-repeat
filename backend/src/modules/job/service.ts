import { requireNonNull } from "@src/util/common";
import { JobMapper } from "./mapper";
import { JobDao } from "@src/models/classes/dao/job";
import { validateNotNull } from "@src/util/validation";

export class JobService {

    private readonly mapper: JobMapper;

    constructor(mapper: JobMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async getById(id: number): Promise<JobDao | null> {
        validateNotNull(id, "id");

        return this.mapper.getById(id);
    }

}