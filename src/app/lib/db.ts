// import mysql from "mysql2/promise";

// export const database = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "kms_store",
// });

// app/lib/db.ts (or equivalent file)
// app/lib/db.ts

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

// Simple wrapper to run queries
export async function sql(query: string, values?: any[]) {
    return await pool.query(query, values);
}