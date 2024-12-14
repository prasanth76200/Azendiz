  const { upload } = require('../services/imageUploadService');
  const { showImageDetailsById } = require('../services/imageUploadService');
  const { v4: uuidv4 } = require('uuid');
  const imageUploadModel = require('../models/imageUploads');

  // Upload Image Controller
  const uploadImage = async (req, res) => {
    try {
      // Handle multer upload
      await new Promise((resolve, reject) => {
        upload.single('image')(req, res, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      if (!req.file) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'No file uploaded' }));
      }

      const { product_id, created_by } = req.body;

      // Validate required fields
      if (!product_id || !created_by) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Missing required fields' }));
      }

      // Prepare data for DB
      const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const image_id = uuidv4();
      const image_name = req.file.originalname;
      const image_path_name = req.file.path;
      const created_on = currentDate;

      // Save image details to the database
      await imageUploadModel.uploadImageModel(
        image_id,
        product_id,
        image_name,
        image_path_name,
        created_by,
        created_on
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Image uploaded and data saved successfully',
          file: req.file,
        })
      );
    } catch (error) {
      console.error('Error:', error.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message || 'Internal Server Error' }));
    }
  };

  const showImageDetailsByProductId = async (req, res) => {
    try {
        // Parse the request body
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const { product_id } = JSON.parse(body); // Extract product_id from the body

            // Validate the product_id
            if (!product_id) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Missing product_id in request body' }));
            }

            // Fetch image details from the database
            const images = await showImageDetailsById(product_id);

            // If no images found, return a 404 response
            if (!images || images.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'No images found for this product' }));
            }

            // Return image details in the response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ images }));
        });
    } catch (error) {
        console.error('Error fetching image details:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

const editImage = async (req, res) => { 
  try {
    // Handle multer upload
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const { image_id, modified_by } = req.body;

    // Validate required fields
    if (!image_id || !modified_by) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Prepare data for DB
    const image_name = req.file.originalname;
    const image_path_name = req.file.path;
    const modified_on = currentDate;

    const updates = {
      image_name,
      image_path_name,
      modified_by,
      modified_on
    };

    // Save image details to the database
    const result = await imageUploadModel.editImageModel(image_id, updates);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Image not found or not updated' });
    }

    return res.status(200).json({
      message: 'Image updated successfully',
      file: req.file
    });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};


  module.exports = { uploadImage, showImageDetailsByProductId,editImage };