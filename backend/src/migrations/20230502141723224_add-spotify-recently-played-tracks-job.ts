/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`insert into job (name, display_name, enabled, interval_ms, initial_delay_ms, created_at, updated_at) values ('fetch_spotify_recently_played_tracks', 'Fetch recently played tracks from Spotify', true, 3600000, 1000, now(), null)`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
