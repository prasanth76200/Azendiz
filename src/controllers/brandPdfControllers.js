const { upload } = require('../middleware/pdfMulter');  // Use PDF upload service
const { v4: uuidv4 } = require('uuid');
const brandPdfUploadModel = require('../models/brandsPdfUploads');  // Updated to handle PDFs
const cloudinary = require("../config/CloudnaryConfig");

// brand_pdf_id, brand_pdf_name,brand_pdf_path, created_by, createdOn
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

    const { brand_pdf_name,brand_id, created_by } = req.body;

    // Validate required fields
    if (!brand_pdf_name || !created_by ||!brand_id) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Prepare data for DB
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const brand_pdf_id = uuidv4();
    // const brand_pdf_name = req.file.originalname;
    const pdf_path_name = req.file.path;
    const created_on = currentDate;
 // Upload the image to Cloudinary (no need to store it locally)
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: `brandpdf/${brand_pdf_id}`, // Unique public ID for Cloudinary
      folder: 'brandpdf/', // Optional: Organize into folders in Cloudinary
      resource_type: 'auto', // Automatically determine the file type (image, video, etc.)
    });
    // Save PDF details to the database
    await brandPdfUploadModel.uploadBrandPdfModel(
      brand_pdf_id,
      brand_pdf_name,
      cloudinaryResult.secure_url,
      brand_id,
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
const showAllPdfDetails = async (req, res) => {
  try {
  
    const pdfDetails = await brandPdfUploadModel.showPdfDetails();
    res.status(200).json({ pdfDetails });
  } catch (error) {
    console.error('Error fetching PDF details:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Edit PDF details (for updating existing PDFs)
// const editPdf = async (req, res) => {
//   try {
//     // Handle multer PDF upload
//     await new Promise((resolve, reject) => {
//       upload.single('pdfFile')(req, res, (err) => {  
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     // if (!req.file) {
//     //   return res.status(400).json({ message: 'No file uploaded' });
//     // }

//     const { brand_pdf_id, modified_by } = req.body;

//     // Validate required fields
//     if (!brand_pdf_id || !modified_by) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
    
//     // Prepare data for DB
//     const brand_pdf_name = req.file.originalname;
//     const brand_pdf_path = req.file.path;
//     const modified_on = new Date().toISOString().replace('T', ' ').substring(0, 19);

//     const updates = {
//       brand_pdf_name,
//       brand_pdf_path,
//       modified_by,
//       modified_on,
//     };

//     // Save updated PDF details to the database
//     const result = await brandPdfUploadModel.editBrandPdfModel(brand_pdf_id , updates);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'PDF not found or not updated' });
//     }

//     return res.status(200).json({
//       message: 'PDF updated successfully',
//       file: req.file,
//     });

//   } catch (error) {
//     console.error('Error:', error.message);
//     return res.status(500).json({ message: error.message || 'Internal Server Error' });
//   }
// };


const deletePdfId = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req); // Parse the request body

        // Extract fields from the request body
        const {brand_pdf_id , is_deleted, deleted_by } = parsedBody;

        // Validate that `company_id` is provided
        if (!brand_pdf_id) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Company ID is required' }));
        }
        const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19); 
        // Prepare the updated fields
        const updates = {
            is_deleted: is_deleted || true, // Default to true if not provided
            deleted_by: deleted_by || 'System', // Fallback to 'System' if not provided
            deleted_on: currentDate // Set the current timestamp
        };

        // Call the model to update the company
        const result = await brandPdfUploadModel.deleteByPdfId(brand_pdf_id, updates);

        // Check if the company was updated successfully
        if (result.affectedRows > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Company marked as deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Company not found or no changes made' }));
        }
    } catch (error) {
        console.error('Error in deleteCompanyId:', error);

        // Handle JSON parsing errors
        if (error.message === 'Invalid JSON') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid JSON format in request body' }));
        }

        // Handle other internal server errors
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
};

const parseRequestBody = (req) => {
  return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
          try {
              resolve(JSON.parse(body));
          } catch (error) {
              reject(new Error('Invalid JSON'));
          }
      });
  });
};

module.exports = { uploadPdf, showAllPdfDetails, deletePdfId };
