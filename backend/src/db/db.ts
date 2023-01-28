import postgres from 'postgres';
import { getDbConnectionUrl } from '@src/config';

const sql = postgres(getDbConnectionUrl(), {
    transform: {
        ...postgres.camel,
        undefined: null
    }
});

export default sql;