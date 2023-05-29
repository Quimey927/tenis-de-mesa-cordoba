const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'quimey',
  host: 'localhost',
  database: 'table_tennis_cordoba',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
