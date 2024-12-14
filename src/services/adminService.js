const adminModel = require('../models/adminModel');

const getLoginFieldAdminService = async (adminUserName, adminPassword) => {
    try {
        const result = await adminModel.getLoginFieldForAdminModels(adminUserName);

        if (result.length === 0) {
            return false;
        }

        const { admin_password: dbPassword, role, admin_id } = result[0];

        if (dbPassword === adminPassword) {
            return { role, admin_id };
        }
        return false; 
    } catch (error) {
        console.error('Error in companyService:', error.message);
        throw new Error('Database query failed');
    }
};


module.exports={
    getLoginFieldAdminService,
}