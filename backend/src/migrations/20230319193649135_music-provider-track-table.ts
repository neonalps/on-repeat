/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const TABLE_NAME = "music_provider_tracks";

const UNIQUE_CONSTRAINT_MUSIC_PROVIDER_ID_TRACK_ID = "uq_music_provider_tracks_music_provider_id_track_id";

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        music_provider_id: {
            type: 'integer',
            notNull: true,
            references: `"music_provider"`,
        },
        track_id: {
            type: 'integer',
            notNull: true,
            references: `"track"`,
        },
        music_provider_track_id: {
            type: 'varchar(100)',
            notNull: true,
        },
        music_provider_track_uri: {
            type: 'varchar(1000)',
            notNull: false,
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.addConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_MUSIC_PROVIDER_ID_TRACK_ID, {
        unique: ['music_provider_id', 'track_id']
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_MUSIC_PROVIDER_ID_TRACK_ID);

    pgm.dropTable(TABLE_NAME);
}
