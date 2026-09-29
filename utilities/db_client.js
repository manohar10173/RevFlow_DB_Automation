// utilities/db_client.js
const sql = require('mssql');

let pool;

async function connect() {
  if (pool) return pool;

  pool = new sql.ConnectionPool({
    server: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 1433),
    database: process.env.DB_NAME,
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
    authentication: {
      type: 'azure-active-directory-password',
      options: {
        userName: process.env.DB_AAD_USERNAME,
        password: process.env.DB_AAD_PASSWORD,
        clientId: process.env.DB_AAD_CLIENT_ID || '1950a258-227b-4e31-a9cf-717495945fc2',
        tenantId: process.env.DB_AAD_TENANT_ID || 'organizations',
      },
    },
  });

  await pool.connect();
  return pool;
}

async function runQuery(query, params = {}) {
  const connection = await connect();
  const request = connection.request();
  Object.entries(params).forEach(([key, value]) => request.input(key, value));
  const result = await request.query(query);
  return result.recordset;
}

async function closeConnection() {
  if (pool) await pool.close();
  pool = null;
}

module.exports = { runQuery, closeConnection };