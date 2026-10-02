// ============================================================
// Database Connection Utility (Stub)
// ============================================================
// In production this module connects to a MySQL instance using
// mysql2 / knex. For now it is a stub so the API can bootstrap
// without a real database connection.
//
// The connection pool will be lazily initialised from
// DATABASE_URL (or individual DB_* env vars) when the server
// starts.
// ============================================================

/**
 * Placeholder for the real MySQL connection pool.
 * Will be replaced with `mysql2/promise` in a future phase.
 */
let pool: unknown = null;

/**
 * Get or create the database connection pool.
 * Returns null when no DATABASE_URL is configured.
 */
export function getPool(): unknown {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return null;
  }

  // TODO: Implement real MySQL connection
  // Example with mysql2:
  //   import mysql from "mysql2/promise";
  //   pool = mysql.createPool(databaseUrl);
  return null;
}

/**
 * Execute a SQL query against the database.
 * Throws when the pool is not initialised.
 */
export async function query(
  _sql: string,
  _params?: unknown[],
): Promise<unknown[]> {
  const conn = getPool();
  if (!conn) {
    throw new Error(
      "Database connection is not configured. Set DATABASE_URL env var.",
    );
  }

  // TODO: Delegate to real connection pool
  return [];
}

/**
 * Gracefully close the database connection pool on shutdown.
 */
export async function closePool(): Promise<void> {
  if (pool) {
    // TODO: Close the real connection pool
    pool = null;
  }
}
