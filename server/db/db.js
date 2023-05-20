const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'quimey',
  host: 'localhost',
  database: 'table_tennis_cordoba',
  password: 'Jhlukhrtjncb.927',
  port: 5432,
});

module.exports = pool;
