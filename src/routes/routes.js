const express = require('express');
const companyController = require('../controllers/companyController');
const adminCompanyMasterController = require('../controllers/adminCompanyMasterController');
const productCatagory = require('../controllers/productCatagory');
const adminController = require('../controllers/adminControllers');
const imageUpload = require('../controllers/imageUploads');
const adminProductDetailsController = require('../controllers/adminProductDetails');
const ImageController = require('../controllers/imageUploads');
const adminDashboardController = require('../controllers/adminDashbordCounts');
const productBrand = require('../controllers/adminProductBrand');
const brandPdf = require('../controllers/brandPdfControllers');
const router = express.Router();

// Company routes
router.post('/api/login', companyController.getLoginFieldController);
router.post('/api/company', companyController.getCompanieByIdController);
router.get('/api/companies', adminCompanyMasterController.getAllCompanies);
router.post('/api/addCompanies', adminCompanyMasterController.addCompanies);
router.patch('/api/updateCompanies', adminCompanyMasterController.updateCompanies);
router.patch('/api/deleteCompany', adminCompanyMasterController.deleteCompanyId);

// Product Category routes
router.post('/api/addProductCatagory', productCatagory.addCatagoryProducts);
router.get('/api/showAllProductCatagory', productCatagory.showProductCatagory);
router.patch('/api/updateProductCatagoryById', productCatagory.updateProductCatagory);
router.patch('/api/deleteProductCatagoryById', productCatagory.deleteProductCatagoryById);


// Product Brand routes
router.post('/api/addProductBrand', productBrand.addCatagoryBrands);
router.get('/api/showAllProductBrand', productBrand.showProductBrand);
router.patch('/api/updateProductBrandById', productBrand.updateProductBrand);
router.patch('/api/deleteProductBrandById', productBrand.deleteProductBrandById);

// Admin routes
router.post('/api/adminlogin', adminController.getAdminLoginFieldController);

// Admin routes
router.post('/api/UploadBrandPdf', brandPdf.uploadPdf);
router.get('/api/showBrandPdf', brandPdf.showAllPdfDetails);
// router.patch('/api/editBrandPdf', brandPdf.editPdf);
router.post('/api/deleteBrandPdf', brandPdf.deletePdfId);


// Product details routes
router.get('/api/showProductDetails', adminProductDetailsController.showProductDetails);
router.post('/api/addProductDetails', adminProductDetailsController.addProductsDetails);
router.post('/api/imageUpload', imageUpload.uploadImage);
router.patch('/api/updateProductDetails', adminProductDetailsController.updateProductDetails);
router.patch('/api/deleteProductDetails', adminProductDetailsController.deleteProductDetailsById);
router.post('/api/getImageDetailsById', ImageController.showImageDetailsByProductId);
router.post('/api/editImage', ImageController.editImage);

// Dashboard routes
router.get('/api/getCompainesCount', adminDashboardController.showCompanyCounts);
router.get('/api/getProductsCount', adminDashboardController.showProductsCount);
router.get('/api/getCatagoriesCount', adminDashboardController.showCatagoriesCounts);
router.get('/api/getBrandCount', adminDashboardController.showBrandCounts);

module.exports = router;
