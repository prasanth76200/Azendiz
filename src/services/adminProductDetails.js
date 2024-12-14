const productDetailsModel = require('../models/productDetailsModel');


const showAllproductDetails=async()=>{

    try {
        const productDetails = await productDetailsModel.showAllProductDetailsModel();
        return productDetails; 
    } catch (error) {
        console.error('Error in showProductCatagoryService:', error);
        throw new Error('Failed to fetch product productDetails');
    }

}


const addProductDetails = async()=>{

    try {
        const productDetails = await productDetailsModel.addProductDetails();
        return productDetails;
        
    } catch (error) {
        console.error("Error in productDetails" , error);
        throw new Error("Database prob");
    }
}



const updateProductDetailsServiceById= async(product_id,updates)=>{

    try{
        const updateProducts = await productDetailsModel.updateProductDetails(product_id,updates);
        return updateProducts;
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');
    }
}
const deleteProductDetailsServiceById= async(product_id,updates)=>{

    try{
        const updateProducts = await productDetailsModel.deleteProductDetailsById(product_id,updates);
        return updateProducts;
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');
    }
}

module.exports={
    showAllproductDetails,
    addProductDetails,
    updateProductDetailsServiceById,
    deleteProductDetailsServiceById
}