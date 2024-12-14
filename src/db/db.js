const mysql = require('mysql2');
const config = require('../config/config.js');

// Function to create a new connection
function createConnection() {
  const connection = mysql.createConnection(config.db);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(createConnection, 2000); // Retry connection after 2 seconds
    } else {
      console.log('Connected to the database');
    }
  });

  // Handle connection errors
  connection.on('error', (err) => {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Reconnecting to the database...');
      createConnection(); // Create a new connection on connection loss
    } else {
      throw err;
    }
  });

  return connection;
}

// Initialize the connection
let connection = createConnection();

module.exports = connection;
