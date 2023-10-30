/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const TABLE_NAME = "played_track";

const UNIQUE_CONSTRAINT_ACCOUNT_ID_PLAYED_AT = "uq_played_track_account_id_played_at";

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        account_id: {
            type: 'integer',
            notNull: true,
            references: `"account"`,
        },
        track_id: {
            type: 'integer',
            notNull: true,
            references: `"track"`,
        },
        music_provider_id: {
            type: 'integer',
            notNull: true,
            references: `"music_provider"`,
        },
        played_at: {
            type: 'timestamptz',
            notNull: true,
        },
        include_in_statistics: {
            type: 'boolean',
            notNull: true,
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.addConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ACCOUNT_ID_PLAYED_AT, {
        unique: ['account_id', 'played_at']
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ACCOUNT_ID_PLAYED_AT);

    pgm.dropTable(TABLE_NAME);
}
