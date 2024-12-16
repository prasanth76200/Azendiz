const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './brandPdfs'; // Folder for storing PDFs
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename the file with timestamp
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf/; // Only allow PDF files
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extname && mimeType) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only PDF files are allowed!')); // Reject the file if it's not a PDF
    }
  },
});

module.exports = { upload };
