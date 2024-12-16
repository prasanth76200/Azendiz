const imageModel = require('../models/imageUploads')

const showImageDetailsById = (product_id)=>{

  try {
    const getImageDetails = imageModel.showImagesById(product_id);
    return getImageDetails;
  } catch (error) {
    console.error('Error in companyService:', error);
    throw new Error('Database query failed');
  }


}




module.exports = {showImageDetailsById };
