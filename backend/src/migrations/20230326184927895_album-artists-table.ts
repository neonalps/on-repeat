/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const TABLE_NAME = "album_artists";

const UNIQUE_CONSTRAINT_ALBUM_ID_ARTIST_ID = "uq_album_artists_album_id_artist_id";

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        album_id: {
            type: 'integer',
            notNull: true,
            references: `"album"`,
        },
        artist_id: {
            type: 'integer',
            notNull: true,
            references: `"artist"`,
        },
    });

    pgm.addConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ALBUM_ID_ARTIST_ID, {
        unique: ['album_id', 'artist_id']
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ALBUM_ID_ARTIST_ID);

    pgm.dropTable(TABLE_NAME);
}
