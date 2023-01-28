import postgres from 'postgres';
import { getDbConnectionUrl } from '@src/config';

const sql = postgres(getDbConnectionUrl(), {});

export default sql;