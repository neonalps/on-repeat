/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const TABLE_NAME = "track_provider";

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        name: {
            type: 'varchar(1000)',
            notNull: true
        },
        display_name: {
            type: 'varchar(1000)',
            notNull: true
        },
        enabled: {
            type: 'boolean',
            notNull: true
        },
        oauth_client_id: {
            type: 'integer',
            notNull: false,
            references: `"oauth_client"`
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
