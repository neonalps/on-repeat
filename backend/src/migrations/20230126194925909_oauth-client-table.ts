/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "oauth_client";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        name: {
            type: 'varchar(1000)',
            notNull: true
        },
        client_id: {
            type: 'varchar(1000)',
            notNull: true
        },
        client_secret: {
            type: 'varchar(1000)',
            notNull: true
        },
        grant_type: {
            type: 'varchar(200)',
            notNull: true
        },
        scope: {
            type: 'varchar(1000)',
            notNull: true
        },
        authorize_url: {
            type: 'varchar(1000)',
            notNull: false
        },
        authorize_redirect_url: {
            type: 'varchar(1000)',
            notNull: false
        },
        refresh_token_url: {
            type: 'varchar(1000)',
            notNull: true
        },
        state_provider: {
            type: 'varchar(1000)',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable(TABLE_NAME);
}
