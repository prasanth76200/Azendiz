const db = require('../db/db');  // Ensure the database connection is correct

// Model function to fetch all companies from the database
const getAllCompanies = () => {
    return new Promise((resolve, reject) => {
        // SQL query to fetch companies where is_deleted is 0
        const query = `
            SELECT 
                company_id,
                company_name,
                company_address,
                country,
                postal_code,
                company_username,
                company_password
            FROM company_details
            where is_deleted = 0;
        `;
        
        db.query(query, (error, result) => {
            if (error) {
                reject(error);  // Reject the promise if there's an error
            } else {
                resolve(result);  // Resolve the promise with the query result
            }
        });
    });
};



const AddCompaines = (company_id, company_name, company_address, country,postal_code, company_userName, company_password, created_on, created_by) => {
    return new Promise((resolve, reject) => {
        const query = `
        INSERT INTO company_details (company_id, company_name, company_address, country, postal_code, company_userName, company_password, created_on, created_by)
        VALUES (?, ?, ?, ?, ?, ?,?, ?, ?)
        `;

        db.query(query, [company_id, company_name, company_address, country, postal_code, company_userName, company_password, created_on, created_by], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

// This Function is for update the Companies Value
const updateTheCompainesMaster = (companyId, updates) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE company_details
            SET 
                company_name = COALESCE(?, company_name),
                company_address = COALESCE(?, company_address),
                country = COALESCE(?, country),
                postal_code = COALESCE(?, postal_code),
                company_username = COALESCE(?, company_username),
                company_password = COALESCE(?, company_password),
                modified_on = COALESCE(?, modified_on),
                modified_by = COALESCE(?, modified_by)
            WHERE company_id = ?; 
        `;

        const values = [
            updates.company_name || null,
            updates.company_address || null,
            updates.country || null,
            updates.postal_code || null,
            updates.company_username || null,
            updates.company_password || null,
            updates.modified_on || new Date().toISOString(),
            updates.modified_by || null,
            companyId,
        ];

        console.log('Query Values:', values);

        db.query(query, values, (error, result) => {
            if (error) {
                console.error('Error executing update query:', error);
                return reject(error);
            }
            resolve(result);
        });
    });
};

const deleteByCompanyId = (companyId, updates) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE company_details
            SET 
                is_deleted = COALESCE(?, is_deleted),
                deleted_by = COALESCE(?, deleted_by),
                deleted_on = COALESCE(?, deleted_on)
            WHERE company_id = ?;
        `;

        const values = [
            updates.is_deleted || null,
            updates.deleted_by || null,
            updates.deleted_on || null,
            companyId
        ];

        db.query(query, values, (error, result) => {
            if (error) return reject(error);

            resolve(result);
        });
    });
};




module.exports = {
    getAllCompanies,
    AddCompaines,
    updateTheCompainesMaster,
    deleteByCompanyId
};
