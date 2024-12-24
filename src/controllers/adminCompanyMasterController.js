const adminCompanyMasterService = require('../services/adminCompanyMasterServices');
const adminCompanyMasterModel = require('../models/adminCompanyMasterModel');

const { v4: uuidv4 } = require('uuid');
const fastJson = require('fast-json-stringify');

const stringify = fastJson({
    title: 'Companies',
    type: 'object',
    properties: {
        companies: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    company_id: { type: 'string' },
                    company_name: { type: 'string' },
                    company_address:{type: 'string'},
                    country:{type: 'string'},
                    postal_code:{type: 'string'},
                    company_username:{type: 'string'},
                    company_password:{type: 'string'}
                  
                }
            }
        }
    }
});
const getAllCompanies = async (req, res) => {
    try {
        const companies = await adminCompanyMasterService.getAllCompanies();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(stringify({ companies }));
        
    } catch (error) {
        console.error('Error in getAllCompanies:', error);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
};


const addCompanies = async (req, res) => {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
             
                if (!body) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Request body is required' }));
                }
                const parsedBody = JSON.parse(body);
                const { company_name, company_address, country,postal_code, company_userName, company_password, created_on, created_by } = parsedBody;

                if (!company_name || !company_address || !company_userName || !company_password || !country) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Required fields are missing' }));
                }
                const company_id = uuidv4();
                const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19); // '2024-12-10 08:09:15'
                
                const result = await adminCompanyMasterModel.AddCompaines(
                    company_id,
                    company_name,
                    company_address,
                    country,
                    postal_code,
                    company_userName,
                    company_password,
                    created_on || currentDate,
                    created_by
                );
                res.writeHead(201, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Company added successfully', company_id }));
            } catch (error) {
                console.error('Error in addCompanies:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
};
const updateCompanies = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req);  // Parse the request body

        // Extract fields from the request body
        const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19); 
        const {
            company_id,  // companyId is now sent in the body
            company_name,
            company_address,
            country,
            postal_code,
            company_userName,
            company_password,
            modified_on,  // optional field
            modified_by  // optional field
        } = parsedBody;

        console.log("parsedBody",parsedBody)
        // Validate company_id is provided
        if (!company_id) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Company ID is required' }));
        }

        // Prepare the updated fields to send to the model
        const updates = {
            company_name: company_name,
            company_address: company_address,
            country: country,
            postal_code:postal_code,
            company_username: company_userName,
            company_password: company_password,
            modified_on: currentDate,  // Default to current date if not provided
            modified_by: modified_by
        };
            console.log(updates.postal_code)
            console.log(updates.company_name)
            console.log("Company userName",updates.company_userName)
            console.log("Company ",updates)
        // Call the model to update the company
        const result = await adminCompanyMasterModel.updateTheCompainesMaster(company_id, updates);

        // Check if the company was updated successfully
        if (result.affectedRows > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Company updated successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Company not found or no changes made' }));
        }
    } catch (error) {
        console.error('Error in updateCompanies:', error);
        if (error.message === 'Invalid JSON') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON format in request body' }));
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
};
const deleteCompanyId = async (req, res) => {
    try {
        const parsedBody = await parseRequestBody(req); // Parse the request body

        // Extract fields from the request body
        const { company_id, is_deleted, deleted_by } = parsedBody;

        // Validate that `company_id` is provided
        if (!company_id) {
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
        const result = await adminCompanyMasterModel.deleteByCompanyId(company_id, updates);

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

module.exports = {
    getAllCompanies,
    addCompanies,
    updateCompanies,
    deleteCompanyId
};
