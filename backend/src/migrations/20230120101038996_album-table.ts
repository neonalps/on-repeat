/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "album";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        name: {
            type: 'varchar(1000)',
            notNull: true,
        },
        album_type: {
            type: 'varchar(200)',
            notNull: false,
        },
        album_group: {
            type: 'varchar(200)',
            notNull: false,
        },
        total_tracks: {
            type: 'integer',
            notNull: false,
        },
        release_date: {
            type: 'timestamp',
            notNull: false,
        },
        release_date_precision: {
            type: 'varchar(200)',
            notNull: false,
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamptz',
            notNull: false,
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable(TABLE_NAME);
}
