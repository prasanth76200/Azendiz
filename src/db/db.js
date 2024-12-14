const mySql = require('mysql2');
const config = require('../config/config.js');

 const connection  = mySql.createConnection(config.db);
// console.log('connection:', connection);
// console.log('Frontend URL:', process.env.FRONTEND_URL);

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });
  
  connection.on('error', (err) => {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconnect on connection loss
      console.log('Reconnecting to the database...');
      connection.connect();
    } else {
      throw err;
    }
  });
  
 module.exports = connection;


 
 