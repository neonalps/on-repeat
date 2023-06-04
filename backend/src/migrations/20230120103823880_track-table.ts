/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "track";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        name: {
            type: 'varchar(1000)',
            notNull: true
        },
        album_id: {
            type: 'integer',
            notNull: false,
            references: `"album"`
        },
        isrc: {
            type: 'varchar(20)',
            notNull: false,
        },
        bucket: {
            type: 'serial',
            notNull: true,
            references: `"track"`,
        },
        disc_number: {
            type: 'smallint',
            notNull: false,
        },
        track_number: {
            type: 'smallint',
            notNull: false,
        },
        duration_ms: {
            type: 'integer',
            notNull: false,
        },
        explicit: {
            type: 'boolean',
            notNull: false,
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
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable(TABLE_NAME);
}
