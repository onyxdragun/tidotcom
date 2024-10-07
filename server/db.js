import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

let dbPool;

try {
  dbPool = mysql.createPool({
    // Connect to MySQL
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
  });
  console.log('Database pool created sucessful for: ', process.env.SQL_HOST);
} catch (error) {
  console.error('Error creating database pool:', error.message);
}

const debugQuery = (query, values) => {
  return mysql.format(query, values);
}

export {dbPool, debugQuery};