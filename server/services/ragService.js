const Document = require('../models/Document');
const { getEmbedding } = require('./aiService');

/**
 * Calculate cosine similarity between two vectors
 */
const cosineSimilarity = (vecA, vecB) => {
    let dotProduct = 0;
    let mA = 0;
    let mB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        mA += vecA[i] * vecA[i];
        mB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(mA) * Math.sqrt(mB));
};

/**
 * Perform RAG: find similar chunks and construct context
 */
const performRAG = async (userQuery) => {
    try {
        // 1. Get query embedding
        const queryEmbedding = await getEmbedding(userQuery);

        // 2. Fetch all documents and chunks
        // Note: In a production app with many docs, use Atlas Vector Search
        const documents = await Document.find({});

        let allChunks = [];
        documents.forEach(doc => {
            doc.contentChunks.forEach(chunk => {
                allChunks.push({
                    text: chunk.text,
                    embedding: chunk.embedding,
                    docTitle: doc.title
                });
            });
        });

        if (allChunks.length === 0) {
            return "No knowledge base documents found. Please upload some documents first.";
        }

        // 3. Simple similarity search
        const scoredChunks = allChunks.map(chunk => ({
            text: chunk.text,
            similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
        }));

        // Sort by similarity and take top 5
        const topChunks = scoredChunks
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 5);

        // 4. Construct context string
        const context = topChunks.map(c => c.text).join("\n\n---\n\n");
        return context;

    } catch (error) {
        console.error("RAG Error:", error);
        throw error;
    }
};

module.exports = { performRAG };
