const app = require('./app');
const config = require('./config/config');
require('dotenv').config();

// Set the port dynamically or fallback to 9000
const port = 9000;

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit to ensure the process manager restarts it
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received: closing server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received: shutting down...');
  process.exit(0);
});
