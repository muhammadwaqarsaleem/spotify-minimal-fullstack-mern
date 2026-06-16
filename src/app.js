const express = require('express'); // To use express package to program server
const cookieParser = require('cookie-parser'); // To use middleware to access cookies from user`s web browser
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

const app = express(); // store an instance of the server in app var.

// Middleware: that allow our server to properly accept/send data from/to frontend
app.use(express.json()); // For raw format json data
app.use(cookieParser()); // To access browser cookies from frontend
app.use('/api/auth', authRoutes); // to access auth api across the app
app.use('/api/music', musicRoutes); 

module.exports = app; // To use app.js in other files