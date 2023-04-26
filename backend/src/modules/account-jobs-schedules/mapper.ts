import sql from "@src/db/db";
import { AccountJobScheduleDao } from "@src/models/classes/dao/account-job-schedule";
import { CreateAccountJobScheduleDto } from "@src/models/classes/dto/create-account-job-schedule";
import { AccountJobScheduleDaoInterface } from "@src/models/dao/account-job-schedule.dao";

export class AccountJobScheduleMapper {
 
    constructor() {}

    public async create(accountJobSchedule: CreateAccountJobScheduleDto): Promise<number> {
        const result = await sql`
            insert into account_jobs_schedules
                (public_id, account_job_id, state, scheduled_after, started_at, finished_at, error_message, created_at)
            values
                (${ accountJobSchedule.publicId }, ${ accountJobSchedule.accountJobId }, ${ accountJobSchedule.state }, ${ accountJobSchedule.scheduledAfter }, ${ accountJobSchedule.startedAt }, ${ accountJobSchedule.finishedAt }, ${ accountJobSchedule.errorMessage }, now(), null)
            returning id
        `;
    
        return result[0].id;
    };

    public async getById(id: number): Promise<AccountJobScheduleDao | null> {
        const result = await sql<AccountJobScheduleDaoInterface[]>`
            select
                id,
                public_id,
                account_job_id,
                state,
                scheduled_after,
                started_at,
                finished_at,
                error_message,
                created_at
            from
                account_jobs_schedules
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return AccountJobScheduleDao.fromDaoInterface(result[0]);
    }

    public async markScheduled(id: number, state: string): Promise<void> {
        await sql`
            update account_jobs_schedules set
                state = ${ state }
            from
                account_jobs_schedules
            where
                id = ${ id }
        `;
    }

    public async markBatchScheduled(ids: Set<number>, state: string): Promise<void> {
        await sql`
            update account_jobs_schedules set
                state = ${ state }
            from
                account_jobs_schedules
            where
                id in ${ sql(Array.from(ids)) }
        `;
    }

    public async markStarted(id: number, state: string): Promise<void> {
        await sql`
            update account_jobs_schedules set
                state = ${ state },
                started_at = now()
            from
                account_jobs_schedules
            where
                id = ${ id }
        `;
    }

    public async markFinished(id: number, state: string, errorMessage: string | null): Promise<void> {
        await sql`
            update account_jobs_schedules set
                state = ${ state },
                finished_at = now(),
                error_message = ${ errorMessage }
            from
                account_jobs_schedules
            where
                id = ${ id }
        `;
    }


}