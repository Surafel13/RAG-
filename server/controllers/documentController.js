const Document = require('../models/Document');
const { PDFParse } = require('pdf-parse');
const { getEmbedding } = require('../services/aiService');
const fs = require('fs');

/**
 * Split text into chunks of 500-1000 characters
 */
const chunkText = (text, size = 800, overlap = 100) => {
    const chunks = [];
    let i = 0;
    while (i < text.length) {
        chunks.push(text.slice(i, i + size));
        i += size - overlap;
    }
    return chunks;
};

const uploadDocument = async (req, res) => {
    try {
        const file = req.file;
        const { title } = req.body;

        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        let text = '';
        if (file.mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(file.path);
            const parser = new PDFParse({ data: dataBuffer });
            const data = await parser.getText();
            await parser.destroy();
            text = data.text;
        } else {
            text = fs.readFileSync(file.path, 'utf-8');
        }

        // 1. Chunk text
        const textChunks = chunkText(text);

        // 2. Generate embeddings for each chunk
        const contentChunks = [];
        for (const chunk of textChunks) {
            if (chunk.trim().length < 20) continue; // Skip very small chunks
            const embedding = await getEmbedding(chunk);
            contentChunks.push({
                text: chunk,
                embedding: embedding
            });
        }

        // 3. Save to database
        const document = await Document.create({
            title: title || file.originalname,
            contentChunks,
            createdAt: new Date()
        });

        // Cleanup file
        fs.unlinkSync(file.path);

        res.status(201).json({ message: 'Document uploaded and processed', documentId: document._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing document', error: error.message });
    }
};

const getDocuments = async (req, res) => {
    try {
        const docs = await Document.find({}, 'title createdAt');
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents' });
    }
};

const deleteDocument = async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document' });
    }
};

module.exports = { uploadDocument, getDocuments, deleteDocument };
