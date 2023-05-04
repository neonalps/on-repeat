import postgres from 'postgres';
import { getDbConnectionUrl } from '@src/config';

const sql = postgres(getDbConnectionUrl(), {
    transform: {
        ...postgres.camel,
        undefined: null
    }
});

export const testDbConnection = async () => {
    await sql`select 1`
};

export default sql;