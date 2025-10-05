import mysql from "mysql2/promise";

declare global {
  var _pool: mysql.Pool | undefined;
}

const pool =
  globalThis._pool ??
  mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT ?? 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: false,
    },
  });

if (process.env.NODE_ENV !== "production") globalThis._pool = pool;

export default pool;
