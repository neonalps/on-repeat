/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "account_jobs";

const UNIQUE_CONSTRAINT_ACCOUNT_ID_JOB_ID = "uq_account_jobs_account_id_job_id";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        account_id: {
            type: 'integer',
            notNull: true,
            references: `"account"`,
        },
        job_id: {
            type: 'integer',
            notNull: true,
            references: `"job"`,
        },
        interval_seconds: {
            type: 'integer',
            notNull: false
        },
        failure_count: {
            type: 'integer',
            notNull: false,
            default: 0,
        },
        enabled: {
            type: 'boolean',
            notNull: true
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamptz',
            notNull: false,
        },
    });

    pgm.addConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ACCOUNT_ID_JOB_ID, {
        unique: ['account_id', 'job_id']
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ACCOUNT_ID_JOB_ID);

    pgm.dropTable(TABLE_NAME);
}
