/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "job_schedule";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        job_id: {
            type: 'integer',
            notNull: true,
            references: `"job"`,
        },
        state: {
            type: 'varchar(100)',
            notNull: true,
        },
        scheduled_after: {
            type: 'timestamptz',
            notNull: true,
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
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable(TABLE_NAME);
}
