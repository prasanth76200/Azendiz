const dotEnv = require('dotenv');

dotEnv.config();

// console.log('Database Host:', process.env.DB_HOST);
// console.log('Frontend URL:', process.env.FRONTEND_URL);

module.exports = {
  db: {

    host:'localhost', // Use environment variable if available
    user: 'root',
    password:  '',
    database: 'azendiz',
    port: 3306,
    connectionLimit: 100, // Max number of connections in the pool
    waitForConnections: true,
    queueLimit: 0,
    connectTimeout: 604800, // Timeout for initial connection
    // host:'103.7.11.29', // Use environment variable if available
    // user: 'root',
    // password:  '@Zend1z@24!@#',
    // database: 'azendiz',
    // port: 3306,
    // connectionLimit: 100, // Max number of connections in the pool
    // waitForConnections: true,
    // queueLimit: 0,
    // connectTimeout: 604800, // Timeout for initial connection
  },
  port: '3000',
};
