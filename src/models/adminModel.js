const db = require('../db/db')


const getLoginFieldForAdminModels=(adminUserName)=>{
    return new Promise((resolve, reject)=>{
    
        const query = `
                SELECT 
                    admin_userName,
                    admin_password,
                    admin_id,
                    role
                FROM 
                    admin
                where
                    admin_userName = ?`;
    
        db.query( query,[adminUserName],(error, results)=>{
            if(error) return reject(error);
            resolve(results);
        });
    });
}    


module.exports={
    getLoginFieldForAdminModels,
}