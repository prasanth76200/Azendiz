const mysql = require('mysql2');
const config = require('../config/config.js');

// Function to create a new connection
function createConnection() {
  const connection = mysql.createConnection(config.db);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(handleDisconnect, 2000); // Wait 2 seconds before reconnecting
    } else {
      console.log('Connected to the database');
    }
  });

  connection.on('error', (err) => {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconnect on connection loss
      handleDisconnect();
    } else {
      throw err;
    }
  });

  return connection;
}

// Initialize the connection
const connection = createConnection();

module.exports = connection;
