const companyModel = require('../models/companyModel');

const jwtService = require('./jwtService');

const getCompanieByIdService = async (companyId) => {
    const formatCompanyData = (company) => {
        return {
            companyName: company.company_name,
            companyAddress: company.company_address,
            companyCountry: company.country,
            companyPostalCode: company.postal_code
        };
    };

    try {
        const companies = await companyModel.getcompanieByID(companyId);
        const formattedCompanies = companies.map(formatCompanyData);
        return formattedCompanies;
    } catch (error) {
        console.error('Error in companyService:', error);
        throw new Error('Database query failed');
    }
};


const getLoginFieldService = async (companyUserName, companyPassword) => {
    try {
        const result = await companyModel.getLoginFieldModels(companyUserName);

        if (result.length === 0) {
            return false;
        }

        const { company_password: dbPassword, role, company_id } = result[0];

        if (dbPassword === companyPassword) {
            return { role, company_id };
        }
        return false; 
    } catch (error) {
        console.error('Error in companyService:', error.message);
        throw new Error('Database query failed');
    }
};

const authenticateUser = async (companyUserName, companyPassword) => {
    const user = await getLoginFieldService(companyUserName, companyPassword);
    if (user) {
        const token = jwtService.generateToken({ company_userName: companyUserName, company_id: user.company_id }, user.role);
        return { token, company_id: user.company_id };
    }
    throw new Error('Invalid credentials');
};

// console.log(getLoginsFieldService());

module.exports = { 
    
    getCompanieByIdService,
    getLoginFieldService,
    authenticateUser

 };
