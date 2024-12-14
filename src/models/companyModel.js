const db = require('../db/db');

const getcompanieByID=(companyId)=>{
    return new Promise((resolve, reject)=>{
        const query = `SELECT 
                        company_name,
                        company_address,
                        country,
                        postal_code
                        FROM company_details
                        where company_id = ? AND is_deleted = 0`

        db.query(query ,[companyId] ,(error, results)=>{
            if(error) return reject(error);
            resolve(results);
        });
    });
};

const getLoginFieldModels=(companyUserName)=>{
return new Promise((resolve, reject)=>{

    const query = `
            SELECT 
                company_userName,
                company_password,
                company_id
            FROM 
                company_details
            where
                company_username = ? AND is_deleted = 0`;

    db.query( query,[companyUserName],(error, results)=>{
        if(error) return reject(error);
        resolve(results);
    });
});

};

module.exports={
    getcompanieByID,
    getLoginFieldModels,
}
