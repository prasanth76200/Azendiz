const express = require('express');
const path = require('path');
const dotEnv = require('dotenv');
const cors = require('cors'); // Importing cors module
const routes = require('./routes/routes');

dotEnv.config();

const app = express();
const compression = require('compression');
// CORS configuration
const corsOptions = {
  origin: ['https://apps.azendiz.com','http://localhost:4200'],  // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(compression());
// Serve static files
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
app.use('/brandPdfs', express.static(path.resolve(__dirname, '../brandPdfs')));



// Define other routes
app.use(routes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
