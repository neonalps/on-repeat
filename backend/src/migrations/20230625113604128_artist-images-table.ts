/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const TABLE_NAME = "artist_images";

const UNIQUE_CONSTRAINT_ARTIST_ID_HEIGHT_WIDTH = "uq_artist_images_artist_id_height_width";

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        artist_id: {
            type: 'integer',
            notNull: true,
            references: `"artist"`,
        },
        height: {
            type: 'smallint',
            notNull: false,
        },
        width: {
            type: 'smallint',
            notNull: false,
        },
        url: {
            type: 'varchar(1000)',
            notNull: true,
        },
    });

    pgm.addConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ARTIST_ID_HEIGHT_WIDTH, {
        unique: ['artist_id', 'height', 'width']
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ARTIST_ID_HEIGHT_WIDTH);

    pgm.dropTable(TABLE_NAME);
}
