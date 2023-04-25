import { requireNonNull } from "@src/util/common";
import { JobScheduleMapper } from "./mapper";

export class JobScheduleService {

    private readonly mapper: JobScheduleMapper;

    constructor(mapper: JobScheduleMapper) {
        this.mapper = requireNonNull(mapper);
    }

    

}