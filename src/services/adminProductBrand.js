const productBrandModel = require('../models/adminBrandModel');


const showProductBrandService = async () => {
    try {
        const categories = await productBrandModel.showAllProductBrandModel();
        return categories; 
    } catch (error) {
        console.error('Error in showProductBrandService:', error);
        throw new Error('Failed to fetch product categories');
    }
};


const addProductBrandService = async() => {

    try {
        const addCatagories = await productBrandModel.addProductBrand();
        return addCatagories;
        
    } catch (error) {
        console.error("Error in productCata" , error);
        throw new Error("Database prob");
    }
}

const updateProductBrandServiceById= async(brandId,updates)=>{

    try{
        const updateBrand = await productBrandModel.updateProductBrand(brandId,updates);
        return updateBrand;
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');
    }
}

const deleteProductBrandServiceById = async(brandId,updates)=>{

    try{
        const deleteTheBrand = await productBrandModel.deleteBrandById(brandId,updates);
        return deleteTheBrand;
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');
    }
}


module.exports ={
   
    showProductBrandService,
    addProductBrandService,
    updateProductBrandServiceById,
    deleteProductBrandServiceById
}