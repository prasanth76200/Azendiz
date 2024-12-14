const productDetailsService = require('../services/adminProductDetails')
const productDetailsModel = require('../models/productDetailsModel')
const { v4: uuidv4 } = require('uuid');

const showProductDetails = async (req, res) => {
    try {
        const productDeatils = await productDetailsService.showAllproductDetails();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(productDeatils)
        return res.end(JSON.stringify({ productDeatils }));

    } catch (error) {
        console.error('Error in showProductCatagory controller:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Failed to fetch product Deatils' }));
    }

};

const addProductsDetails = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req);
        validateFields(parsedBody, ['product_id','category_id','brand_id', 'product_name','product_sku_code','product_description','product_price','product_lead_time','product_stock',  'created_by']);

        const {product_id,category_id,brand_id, product_name,product_sku_code,product_description,product_price,product_lead_time,product_stock,product_remarks, created_by } = parsedBody;
        // const product_id = uuidv4();
        const created_on =  new Date().toISOString().replace('T', ' ').substring(0, 19);

        await productDetailsModel.addProductDetails(product_id,category_id,brand_id, product_name,product_sku_code,product_description,product_price,product_lead_time,product_stock,product_remarks, created_on, created_by );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Product added successfully', product_id }));
    } catch (error) {
        console.error('Error in addCatagoryProducts:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
    }
};

const updateProductDetails = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req);
        validateFields(parsedBody, ['product_id','category_id','brand_id', 'product_name' ,'product_sku_code','product_description' ,'product_price','product_lead_time','product_stock', 'modified_by']);
        const updates = {
            category_id: parsedBody.category_id,
            brand_id: parsedBody.brand_id,
            product_name: parsedBody.product_name,
            product_sku_code: parsedBody.product_sku_code,
            product_description: parsedBody.product_description,
            product_price: parsedBody.product_price,
            product_lead_time: parsedBody.product_lead_time,
            product_remarks: parsedBody.product_remarks,
            product_stock: parsedBody.product_stock,
            modified_on:  new Date().toISOString().replace('T', ' ').substring(0, 19),
            modified_by: parsedBody.modified_by,
        };
        const result = await productDetailsModel.updateProductDetails(parsedBody.product_id, updates);
        if (result.affectedRows > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log(result)
            res.end(JSON.stringify({ message: 'Product updated successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Product not found or no changes made' }));
        }
    } catch (error) {
        console.error('Error in updateProductDetails:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
    }
};

const deleteProductDetailsById = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req);
        validateFields(parsedBody, ['product_id','is_deleted','deleted_by']);
        const updates = {
            product_id: parsedBody.product_id,
            is_deleted: parsedBody.is_deleted,
            deleted_on:  new Date().toISOString().replace('T', ' ').substring(0, 19),
            deleted_by: parsedBody.deleted_by,
        };
        const result = await productDetailsModel.deleteProductDetailsById(parsedBody.product_id, updates);
        if (result.affectedRows > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product updated successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Product not found or no changes made' }));
        }
    } catch (error) {
        console.error('Error in updateProductDetails:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
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

const validateFields = (fields, required) => {
    for (const field of required) {
        if (!fields[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
};

module.exports={
    showProductDetails,
    addProductsDetails,
    updateProductDetails,
    deleteProductDetailsById
    
}