const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.AI_API_KEY,
});

const getEmbedding = async (text) => {
    try {
        const response = await ai.models.embedContent({
            model: "gemini-embedding-001",
            contents: [
                {
                    parts: [{ text: text }]
                }
            ],
            taskType: "RETRIEVAL_QUERY",
        });

        return response.embeddings[0].values;

    } catch (error) {
        console.error("Gemini Embedding Error:", error);
        throw error;
    }
};

const getChatCompletion = async (messages) => {
    try {
        const systemMessage =
            messages.find((m) => m.role === "system")?.content || "";

        const userMessage =
            messages.find((m) => m.role === "user")?.content || "";

        const prompt = `${systemMessage}\n\nUser Question: ${userMessage}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ],
        });

        return response.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("Gemini Chat Error:", error);
        throw error;
    }
};

module.exports = {
    getEmbedding,
    getChatCompletion,
};
