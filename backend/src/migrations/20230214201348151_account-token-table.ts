/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "account_token";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        account_id: {
            type: 'varchar(36)',
            notNull: true,
            references: `"account"`
        },
        oauth_provider: {
            type: 'varchar(100)',
            notNull: true
        },
        scope: {
            type: 'varchar(1000)',
            notNull: true
        },
        access_token: {
            type: 'varchar(1000)',
            notNull: true
        },
        access_token_expires_at: {
            type: 'timestamp',
            notNull: true
        },
        refresh_token: {
            type: 'varchar(1000)',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamp',
            notNull: false
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable(TABLE_NAME);
}
