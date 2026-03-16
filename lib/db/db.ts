import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL!;

// Disable prefetch - required for Transaction pool mode (pgbouncer)
const client = postgres(databaseUrl, { 
  prepare: false,
  debug: process.env.NODE_ENV === 'development'
    ? (query, params) => {
        console.log('DB Query:', query);
        console.log('DB Params:', params);
      }
    : undefined,
  onnotice: process.env.NODE_ENV === 'development'
    ? (notice) => console.log('DB Notice:', notice)
    : undefined,
});

export const db = drizzle(client, { schema });
