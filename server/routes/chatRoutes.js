const express = require('express');
const { handleChat, getChatHistory } = require('../controllers/chatController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, handleChat);
router.get('/history', authMiddleware, getChatHistory);

module.exports = router;
