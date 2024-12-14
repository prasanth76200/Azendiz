const { upload } = require('../services/brandPdfUploads');  // Use PDF upload service
const { v4: uuidv4 } = require('uuid');
const brandPdfUploadModel = require('../models/brandsPdfUploads');  // Updated to handle PDFs

// Upload PDF Controller
const uploadPdf = async (req, res) => {
  try {
    // Handle multer PDF upload
    await new Promise((resolve, reject) => {
      upload.single('pdfFile')(req, res, (err) => {  // Ensure 'pdfFile' matches the form field name
        if (err) reject(err);
        else resolve();
      });
    });

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const { product_id, created_by } = req.body;

    // Validate required fields
    if (!product_id || !created_by) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Prepare data for DB
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const pdf_id = uuidv4();
    const pdf_name = req.file.originalname;
    const pdf_path_name = req.file.path;
    const created_on = currentDate;

    // Save PDF details to the database
    await brandPdfUploadModel.uploadBrandPdfModel(
      pdf_id,
      pdf_name,
      pdf_path_name,
      created_by,
      created_on
    );

    res.status(200).json({
      message: 'PDF uploaded and data saved successfully',
      file: req.file,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

// Fetch PDF details by product ID
const showPdfDetailsByProductId = async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      res.status(400).json({ message: 'Missing product_id in request body' });
      return;
    }

    // Fetch PDF details from the database
    const pdfs = await brandPdfUploadModel.showPdfDetailsByProductId(product_id);

    if (!pdfs || pdfs.length === 0) {
      res.status(404).json({ message: 'No PDFs found for this product' });
      return;
    }

    res.status(200).json({ pdfs });
  } catch (error) {
    console.error('Error fetching PDF details:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Edit PDF details (for updating existing PDFs)
const editPdf = async (req, res) => {
  try {
    // Handle multer PDF upload
    await new Promise((resolve, reject) => {
      upload.single('pdfFile')(req, res, (err) => {  // Ensure 'pdfFile' matches the form field name
        if (err) reject(err);
        else resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { pdf_id, modified_by } = req.body;

    // Validate required fields
    if (!pdf_id || !modified_by) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Prepare data for DB
    const pdf_name = req.file.originalname;
    const pdf_path_name = req.file.path;
    const modified_on = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const updates = {
      pdf_name,
      pdf_path_name,
      modified_by,
      modified_on,
    };

    // Save updated PDF details to the database
    const result = await brandPdfUploadModel.editBrandPdfModel(pdf_id, updates);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'PDF not found or not updated' });
    }

    return res.status(200).json({
      message: 'PDF updated successfully',
      file: req.file,
    });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = { uploadPdf, showPdfDetailsByProductId, editPdf };
