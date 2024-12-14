const mysql = require('mysql2');
const config = require('../config/config.js');

// Function to create and handle database connections
function handleDisconnect() {
  const connection = mysql.createConnection(config.db);

  // Attempt to connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
    } else {
      console.log('Connected to the database');
    }
  });

  // Handle connection errors
  connection.on('error', (err) => {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Connection lost. Reconnecting...');
      handleDisconnect(); // Reconnect on connection loss
    } else {
      throw err; // Throw other errors
    }
  });

  module.exports = connection; // Export the connection
}

// Initialize the connection handling
handleDisconnect();
