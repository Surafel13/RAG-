const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    contentChunks: [
        {
            text: { type: String, required: true },
            embedding: { type: [Number], required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
