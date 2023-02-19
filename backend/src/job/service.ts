import { validateNotBlank } from "@src/util/validation";
import mapper from "./mapper";
import userService from "@src/user/service";

const create = async (accountId: string, name: string, intervalSeconds: number, enabled: boolean): Promise<Job> => {
    validateNotBlank(name, "name");
    validateNotBlank(accountId, "accountId");

    const account = await userService.getById(accountId);
    if (account === null) {
        throw new Error(`account with ID ${accountId} does not exist`);
    }

    const job = await mapper.create({
        accountId,
        name,
        intervalSeconds,
        enabled,
    });

    if (!job) {
        throw new Error("failed to create job");
    }

    return toDto(job, account);
};

const getAllEnabled = async (): Promise<Job[]> => {
    const enabledJobs = await mapper.getAllEnabled();

    if (!enabledJobs || enabledJobs.length === 0) {
        return [];
    }

    const result: Job[] = [];
    for (const job of enabledJobs) {
        const account = await userService.getById(job.accountId);

        if (account === null) {
            continue;
        }

        result.push(toDto(job, account));
    }

    return result;
};

const toDto = (dao: JobDao, account: User): Job => {
    return {
        id: dao.id,
        account,
        name: dao.name,
        intervalSeconds: dao.intervalSeconds,
        enabled: dao.enabled,
        createdAt: dao.createdAt,
        updatedAt:dao.updatedAt,
    }
};

const service = {
    create,
    getAllEnabled,
};

export default service;