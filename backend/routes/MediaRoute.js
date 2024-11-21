// routes/mediaRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../path/to/multerSetup');
const { uploadMedia } = require('../controllers/MediaController');

// Use multer middleware to handle file uploads
router.post('/upload-media', upload.single('file'), uploadMedia);

module.exports = router;
