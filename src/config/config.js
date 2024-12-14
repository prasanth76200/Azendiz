const dotEnv = require('dotenv');

dotEnv.config();

// console.log('Database Host:', process.env.DB_HOST);
// console.log('Frontend URL:', process.env.FRONTEND_URL);

module.exports = {
  db: {
    host:'bwbpckti6yh4v5txtagn-mysql.services.clever-cloud.com', // Use environment variable if available
    user: 'ujuuebryns1gklje',
    password:  'DDozvRCw1A3OdnVu42kb',
    database: 'bwbpckti6yh4v5txtagn',
    port: 3306,
    connectionLimit: 10, // Max number of connections in the pool
    waitForConnections: true,
    queueLimit: 0,
    connectTimeout: 604800, // Timeout for initial connection
  },
  port: '3000',
};
