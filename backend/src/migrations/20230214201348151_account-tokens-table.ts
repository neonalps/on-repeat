/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "account_tokens";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        public_id: {
            type: 'varchar(36)',
            notNull: true
        },
        account_id: {
            type: 'integer',
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
        encrypted_access_token: {
            type: 'varchar(1000)',
            notNull: true
        },
        access_token_expires_at: {
            type: 'timestamptz',
            notNull: true
        },
        encrypted_refresh_token: {
            type: 'varchar(1000)',
            notNull: true
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamptz',
            notNull: false
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable(TABLE_NAME);
}
