/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`insert into music_provider (name, display_name, created_at) values ('spotify', 'Spotify', now())`);
    pgm.sql(`insert into music_provider (name, display_name, created_at) values ('api', 'API', now())`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
