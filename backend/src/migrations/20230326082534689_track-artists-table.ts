/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const TABLE_NAME = "track_artists";

const UNIQUE_CONSTRAINT_TRACK_ID_ARTIST_ID = "uq_track_artists_track_id_artist_id";

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        track_id: {
            type: 'integer',
            notNull: true,
            references: `"track"`,
        },
        artist_id: {
            type: 'integer',
            notNull: true,
            references: `"artist"`,
        },
    });

    pgm.addConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_TRACK_ID_ARTIST_ID, {
        unique: ['track_id', 'artist_id']
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_TRACK_ID_ARTIST_ID);

    pgm.dropTable(TABLE_NAME);
}
