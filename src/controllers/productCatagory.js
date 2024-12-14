const productCatagoryService = require('../services/productCatagory');
const productCatagoryModel = require('../models/productCatagoryModel');
const { v4: uuidv4 } = require('uuid');

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

const showProductCatagory = async (req, res) => {
    try {
        const categories = await productCatagoryService.showProductCatagoryService();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ categories }));
    } catch (error) {
        console.error('Error in showProductCatagory controller:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Failed to fetch product categories' }));
    }
};

const addCatagoryProducts = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req);
        validateFields(parsedBody, ['category_name', 'created_by']);
        const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const { category_name, created_by } = parsedBody;
        const category_id = uuidv4();
        const created_on = currentDate;

        await productCatagoryModel.addProductCatagory(category_id, category_name, created_on, created_by);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Category added successfully', category_id }));
    } catch (error) {
        console.error('Error in addCatagoryProducts:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
    }
};

const updateProductCatagory = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req);
        validateFields(parsedBody, ['category_id']);
        const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const updates = {
            category_name: parsedBody.category_name,
            modified_on: currentDate,
            modified_by: parsedBody.modified_by,
        };

        const result = await productCatagoryModel.updateProductCatagory(parsedBody.category_id, updates);

        if (result.affectedRows > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Category updated successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Category not found or no changes made' }));
        }
    } catch (error) {
        console.error('Error in updateProductCatagory:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
    }
};

const deleteProductCatagoryById = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req);
        validateFields(parsedBody, ['category_id']);
        const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const updates = {
            is_deleted: parsedBody.is_deleted !== undefined ? parsedBody.is_deleted : true,
            deleted_by: parsedBody.deleted_by || 'System',
            deleted_on: currentDate,
        };

        const result = await productCatagoryModel.deleteCatagoryById(parsedBody.category_id, updates);

        if (result.affectedRows > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Category marked as deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Category not found or no changes made' }));
        }
    } catch (error) {
        console.error('Error in deleteProductCatagoryById:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
    }
};

module.exports = {
    addCatagoryProducts,
    showProductCatagory,
    updateProductCatagory,
    deleteProductCatagoryById,
};
