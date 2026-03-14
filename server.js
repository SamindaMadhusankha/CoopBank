require('dotenv').config();

// Use Google DNS for MongoDB SRV resolution
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Track MongoDB connection state
let dbConnected = false;

// Enable mongoose buffering - queries wait for connection
mongoose.set('bufferCommands', true);

// Connect to MongoDB with retry
const connectWithRetry = () => {
  console.log('Attempting MongoDB connection...');
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // 30 second timeout
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    w: 'majority'
  })
    .then(() => {
      dbConnected = true;
      console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
      dbConnected = false;
      console.error('MongoDB connection error:', err.message);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Handle connection events
mongoose.connection.on('connected', () => {
  dbConnected = true;
  console.log('MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
  dbConnected = false;
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});

// Export connection state checker
app.locals.isDbConnected = () => dbConnected;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic session configuration (memory-based, for demo only)
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  index: 'index.html'
}));

// Fallback for SPA-like navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
