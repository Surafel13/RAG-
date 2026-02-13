const express = require('express');
const multer = require('multer');
const { uploadDocument, getDocuments, deleteDocument } = require('../controllers/documentController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authMiddleware, adminMiddleware, upload.single('file'), uploadDocument);
router.get('/', authMiddleware, adminMiddleware, getDocuments);
router.delete('/:id', authMiddleware, adminMiddleware, deleteDocument);

module.exports = router;
