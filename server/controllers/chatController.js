const Chat = require('../models/Chat');
const { performRAG } = require('../services/ragService');
const { getChatCompletion } = require('../services/aiService');

const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.id;

        // 1. Perform RAG to get context
        const context = await performRAG(message);

        // 2. Prepare messages for OpenAI
        const promptMessages = [
            {
                role: "system",
                content: `You are a helpful assistant. Answer ONLY using the provided context. If the answer is not in the context, say you don't know based on the knowledge base.
        
        Context:
        ${context}`
            },
            { role: "user", content: message }
        ];

        // 3. Get AI response
        const aiResponse = await getChatCompletion(promptMessages);

        // 4. Save to history
        let chat = await Chat.findOne({ userId });
        if (!chat) {
            chat = new Chat({ userId, messages: [] });
        }

        chat.messages.push({ role: 'user', content: message });
        chat.messages.push({ role: 'assistant', content: aiResponse });
        await chat.save();

        res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Error in chat processing' });
    }
};

const getChatHistory = async (req, res) => {
    try {
        const chat = await Chat.findOne({ userId: req.user.id });
        res.status(200).json(chat ? chat.messages : []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history' });
    }
};

module.exports = { handleChat, getChatHistory };
