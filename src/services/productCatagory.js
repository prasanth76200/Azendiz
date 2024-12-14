const productCatagoryModel = require('../models/productCatagoryModel');


const showProductCatagoryService = async () => {
    try {
        const categories = await productCatagoryModel.showAllProductCatagoryModel();
        return categories; 
    } catch (error) {
        console.error('Error in showProductCatagoryService:', error);
        throw new Error('Failed to fetch product categories');
    }
};


const addProductCatagoryService = async() => {

    try {
        const addCatagories = await productCatagoryModel.addProductCatagory();
        return addCatagories;
        
    } catch (error) {
        console.error("Error in productCata" , error);
        throw new Error("Database prob");
    }
}

const updateProductCatagoryServiceById= async(catagoryId,updates)=>{

    try{
        const updatecatagory = await productCatagoryModel.updateProductCatagory(catagoryId,updates);
        return updatecatagory;
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');
    }
}

const deleteProductCatagoryServiceById = async(catagoryId,updates)=>{

    try{
        const deleteTheCatagory = await productCatagoryModel.deleteCatagoryById(catagoryId,updates);
        return deleteTheCatagory;
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');
    }
}


module.exports ={
   
    showProductCatagoryService,
    addProductCatagoryService,
    updateProductCatagoryServiceById,
    deleteProductCatagoryServiceById
}