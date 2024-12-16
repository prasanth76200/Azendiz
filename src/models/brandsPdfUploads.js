const db = require('../db/db');
const path = require('path');



const uploadBrandPdfModel =(brand_pdf_id, brand_pdf_name,brand_pdf_path, created_by, created_on)=>{
return new Promise((resolve,reject)=>{
    const query =`INSERT INTO brand_pdf (brand_pdf_id, brand_pdf_name,brand_pdf_path, created_by, created_on)
         VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [brand_pdf_id, brand_pdf_name,brand_pdf_path, created_by, created_on],(error,result)=>{
        if(error) return reject(error);
        resolve(result);
    })
})
}


const editBrandPdfModel = (brand_pdf_id, updates) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE brand_pdf 
            SET brand_pdf_name = COALESCE(?, brand_pdf_name), 
                brand_pdf_path = COALESCE(?, brand_pdf_path), 
                modified_by = COALESCE(?, modified_by), 
                modified_on = COALESCE(?, modified_on)
            WHERE brand_pdf_id = ? `;

        const values = [
            updates.brand_pdf_name || null,  // If no new image name, use the old value
            updates.brand_pdf_path || null, 
            updates.modified_by, // If no new path, use the old value
            updates.modified_on,  // Updated modification timestamp
            brand_pdf_id,  // The image ID to match for updating

        ];

        db.query(query, values, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};


module.exports={
    uploadBrandPdfModel,
    editBrandPdfModel
}