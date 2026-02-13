const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('AI Chatbot API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
