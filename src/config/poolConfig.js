const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host:'103.7.11.29', // Use environment variable if available
    user: 'root',
    password:  '@Zend1z@24!@#',
    database: 'azendiz',
    port: 3306,
    connectionLimit: 100, // Max number of connections in the pool
    waitForConnections: true,
    queueLimit: 0,
    connectTimeout: 604800,                  // No limit on queue length
});

module.exports = pool;


