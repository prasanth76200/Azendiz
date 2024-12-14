const adminCompanyMasterModel = require('../models/adminCompanyMasterModel'); 


const getAllCompanies = async () => {
    try {
        const companies = await adminCompanyMasterModel.getAllCompanies();
        return companies; 
    } catch (error) {
        console.error('Error in companyService:', error);
        throw new Error('Database query failed'); 
    }
};


const addCompanies = async () =>{

    try {
        const addingCompanies = await adminCompanyMasterModel.AddCompaines();
        return addingCompanies;
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');

    }
}


const updateTheCompaniesMaster= async(companyId,updates)=>{

    try{
        const updateTheCompanies = await adminCompanyMasterModel.updateTheCompainesMaster(companyId,updates);
        console.log("updateTheCompanies",updateTheCompanies)
        console.log("updateTheCompaniesMaster",updateTheCompaniesMaster)
        return updateTheCompanies;
        
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');
    }
}

const deleteTheCompanyById= async(companyId,updates)=>{

    try{
        const deleteTheCompanies = await adminCompanyMasterModel.deleteByCompanyId(companyId,updates);
        return deleteTheCompanyById;
    }catch(error){
        console.error("Error in addingService:", error);
        throw new Error('Database query failed');
    }
}






module.exports = {
    getAllCompanies,
    addCompanies,
    updateTheCompaniesMaster,
    deleteTheCompanyById
};
