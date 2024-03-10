require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
database: process.env.VITE_REACT_APP_DB,
user: process.env.VITE_REACT_APP_DB_USER,
host: process.env.VITE_REACT_APP_DB_HOST,
password: process.env.VITE_REACT_APP_DB_PASSWORD,
port: process.env.VITE_REACT_APP_DB_PORT,
})

module.exports = pool;