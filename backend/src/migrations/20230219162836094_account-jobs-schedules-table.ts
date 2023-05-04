/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "account_jobs_schedules";
const IDX_SCHEDULED_AFTER = "idx_account_jobs_schedule_scheduled_after";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        public_id: {
            type: 'varchar(36)',
            notNull: true,
        },
        account_job_id: {
            type: 'integer',
            notNull: true,
            references: `"account_jobs"`,
        },
        state: {
            type: 'varchar(100)',
            notNull: true,
        },
        scheduled_after: {
            type: 'timestamptz',
            notNull: true,
        },
        scheduled_at: {
            type: 'timestamptz',
            notNull: false,
        },
        started_at: {
            type: 'timestamptz',
            notNull: false,
        },
        finished_at: {
            type: 'timestamptz',
            notNull: false,
        },
        error_message: {
            type: 'varchar(1000)',
            notNull: false,
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.addIndex(TABLE_NAME, 'scheduled_after', { name: IDX_SCHEDULED_AFTER });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropIndex(TABLE_NAME, 'scheduöed_after', { name: IDX_SCHEDULED_AFTER });

    pgm.dropTable(TABLE_NAME);
}
