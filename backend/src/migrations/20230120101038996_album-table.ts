/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "album";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        name: {
            type: 'varchar(1000)',
            notNull: true
        },
        type: {
            type: 'varchar(200)',
            notNull: false
        },
        album_type: {
            type: 'varchar(200)',
            notNull: false
        },
        album_group: {
            type: 'varchar(200)',
            notNull: false
        },
        release_day: {
            type: 'timestamp',
            notNull: false
        },
        release_day_precision: {
            type: 'varchar(200)',
            notNull: false
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable(TABLE_NAME);
}
