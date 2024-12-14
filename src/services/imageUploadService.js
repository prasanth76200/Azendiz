const multer = require('multer');
const fs = require('fs');
const path = require('path');
const imageModel = require('../models/imageUploads')
// Define multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});


const showImageDetailsById = (product_id)=>{

  try {
    const getImageDetails = imageModel.showImagesById(product_id);
    return getImageDetails;
  } catch (error) {
    console.error('Error in companyService:', error);
    throw new Error('Database query failed');
  }


}




module.exports = { upload ,showImageDetailsById };
