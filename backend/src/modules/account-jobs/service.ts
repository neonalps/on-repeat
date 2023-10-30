import { AccountJobMapper } from "./mapper";
import { validateNotNull } from "@src/util/validation";
import { requireNonNull } from "@src/util/common";
import { CreateAccountJobDto } from "@src/models/classes/dto/create-account-job";
import { AccountJobDao } from "@src/models/classes/dao/account-job";

export class AccountJobService {

    private readonly mapper: AccountJobMapper;

    constructor(mapper: AccountJobMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async create(dto: CreateAccountJobDto): Promise<AccountJobDao | null> {
        validateNotNull(dto, "dto");
        validateNotNull(dto.accountId, "dto.accountId");
        validateNotNull(dto.jobId, "dto.jobId");
        validateNotNull(dto.intervalSeconds, "dto.intervalSeconds");
        validateNotNull(dto.enabled, "dto.enabled");
    
        const accountJobId = await this.mapper.create(dto);
    
        if (!accountJobId) {
            throw new Error("Failed to create account job");
        }
    
        return this.getById(accountJobId);
    }

    public async getById(id: number): Promise<AccountJobDao | null> {
        validateNotNull(id, "id");

        return this.mapper.getById(id);
    }

    public async increaseFailureCount(id: number): Promise<void> {
        validateNotNull(id, "id");

        await this.mapper.increaseFailureCount(id);
    }

    public async resetFailureCount(id: number): Promise<void> {
        validateNotNull(id, "id");

        await this.mapper.resetFailureCount(id);
    }

    public async disableAccountJob(id: number): Promise<void> {
        validateNotNull(id, "id");

        await this.mapper.disableAccountJob(id);
    }

}