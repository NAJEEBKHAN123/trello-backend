const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBconnection = require('./config/db');
const authRoutes = require('./Routes/authRoutes');
const boardRoutes = require('./Routes/boardRoutes');
const listRoutes = require('./Routes/listRoutes');
const taskRoutes = require('./Routes/taskRoutes.js');
const moveRoutes = require('./Routes/moveRoutes.js');

dotenv.config();
const app = express();

// Database Connection
DBconnection();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send("This is the home page");
});

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/moves', moveRoutes);

// ✅ Correct way to export for Vercel
module.exports = app;
