const express = require('express');
const path = require('path');
const dotEnv = require('dotenv');
const cors = require('cors'); // Importing cors module
const routes = require('./routes/routes');

dotEnv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['https://apps.azendiz.com','http://localhost:4200'],  // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Serve static files
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));



// Define other routes
app.use(routes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
