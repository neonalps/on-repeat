/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const TABLE_NAME = "music_provider_artists";

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        music_provider_id: {
            type: 'integer',
            notNull: true,
            references: `"music_provider"`,
        },
        artist_id: {
            type: 'integer',
            notNull: true,
            references: `"artist"`,
        },
        music_provider_artist_id: {
            type: 'varchar(100)',
            notNull: true,
        },
        music_provider_artist_uri: {
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
