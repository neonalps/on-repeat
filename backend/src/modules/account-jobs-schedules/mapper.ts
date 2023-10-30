import sql from "@src/db/db";
import { AccountJobScheduleDao } from "@src/models/classes/dao/account-job-schedule";
import { CreateAccountJobScheduleDto } from "@src/models/classes/dto/create-account-job-schedule";
import { AccountJobScheduleDaoInterface } from "@src/models/dao/account-job-schedule.dao";
import { setEquals } from "@src/util/collection";
import { PendingQuery, Row } from "postgres";
import { SortOrder, determineSortComparison, determineSortOrder } from "@src/modules/pagination/constants";
import { isDefined, removeNull } from "@src/util/common";
import { JobStatus } from "@src/models/enum/job-status";

export class AccountJobScheduleMapper {
 
    constructor() {}

    public async create(accountJobSchedule: CreateAccountJobScheduleDto): Promise<number> {
        const result = await sql`
            insert into account_jobs_schedules
                (public_id, account_job_id, state, scheduled_after, scheduled_at, started_at, finished_at, error_message, created_at)
            values
                (${ accountJobSchedule.publicId }, ${ accountJobSchedule.accountJobId }, ${ accountJobSchedule.state }, ${ accountJobSchedule.scheduledAfter }, ${ accountJobSchedule.scheduledAt }, ${ accountJobSchedule.startedAt }, ${ accountJobSchedule.finishedAt }, ${ accountJobSchedule.errorMessage }, now())
            returning id
        `;
    
        return result[0].id;
    };

    public async getById(id: number): Promise<AccountJobScheduleDao | null> {
        const result = await sql<AccountJobScheduleDaoInterface[]>`
            ${ this.commonAccountJobScheduleSelect() }
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return AccountJobScheduleDao.fromDaoInterface(result[0]);
    }

    public async getByAccountId(accountId: number, state: JobStatus | null, lastSeen: number, order: SortOrder, limit: number): Promise<AccountJobScheduleDao[]> {
        const result = await sql<AccountJobScheduleDaoInterface[]>`
            select
                ajs.id,
                ajs.public_id,
                ajs.account_job_id,
                ajs.state,
                ajs.scheduled_after,
                ajs.scheduled_at,
                ajs.started_at,
                ajs.finished_at,
                ajs.error_message,
                ajs.created_at
            from
                account_jobs_schedules ajs left join
                account_jobs aj on aj.id = ajs.account_job_id
            where
                aj.account_id = ${ accountId }
                and ajs.id ${determineSortComparison(order)} ${ lastSeen }
                ${isDefined(state) ? sql`and ajs.state = ${state}` : sql``}
            order by
                ajs.id ${determineSortOrder(order)}
            limit ${limit}
        `;
    
        if (!result || result.length === 0) {
            return [];
        }
    
        return result.map(item => AccountJobScheduleDao.fromDaoInterface(item)).filter(removeNull) as AccountJobScheduleDao[];
    }

    public async scheduleBatch(batchSize: number): Promise<Set<number>> {
        return sql.begin(async sql => {
            const scheduledItems = await sql`select id from account_jobs_schedules where state = 'READY' and scheduled_after < now() order by scheduled_after limit ${ batchSize }`;

            if (!scheduledItems || scheduledItems.length === 0) {
                return new Set();
            }

            const scheduledIds = scheduledItems.map(item => item.id);

            const updatedItems = await sql`update account_jobs_schedules set state = 'SCHEDULED', scheduled_at = now() where id in ${ sql(scheduledIds) } returning id`;
            const updatedIds = updatedItems.map(item => item.id);

            const scheduledSet = new Set(scheduledIds);
            const updatedSet = new Set(updatedIds);

            if (!setEquals(scheduledSet, updatedSet)) {
                throw new Error("Something went wrong during scheduling");
            }

            return scheduledSet;
        });
    }

    public async markStarted(id: number, state: string): Promise<void> {
        await sql`
            update account_jobs_schedules set
                state = ${ state },
                started_at = now()
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
            where
                id = ${ id }
        `;
    }

    private commonAccountJobScheduleSelect(): PendingQuery<Row[]> {
        return sql`select
                id,
                public_id,
                account_job_id,
                state,
                scheduled_after,
                scheduled_at,
                started_at,
                finished_at,
                error_message,
                created_at
            from
                account_jobs_schedules`;
    }

}