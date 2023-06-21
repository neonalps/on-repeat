/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

const TABLE_NAME = "account";
const UNIQUE_CONSTRAINT_ACCOUNT_HASHED_EMAIL = "uq_account_hashed_email";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(TABLE_NAME, {
        id: 'id',
        public_id: {
            type: 'varchar(36)',
            notNull: true,
        },
        display_name: {
            type: 'varchar(200)',
            notNull: false
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
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamptz',
            notNull: false,
        },
    });

    pgm.addConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ACCOUNT_HASHED_EMAIL, {
        unique: ['hashed_email'],
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropConstraint(TABLE_NAME, UNIQUE_CONSTRAINT_ACCOUNT_HASHED_EMAIL);
    
    pgm.dropTable(TABLE_NAME);
}
