/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "account";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: {
            type: 'varchar(36)',
            notNull: true,
            primaryKey: true
        },
        hashed_email: {
            type: 'varchar(1000)',
            unique: true,
            notNull: true
        },
        encrypted_email: {
            type: 'varchar(1000)',
            notNull: false
        },
        enabled: {
            type: 'boolean',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable(TABLE_NAME);
}
