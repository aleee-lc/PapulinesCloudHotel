const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '18052004pau',
  database: 'papulineshotel'
});

module.exports = pool;
