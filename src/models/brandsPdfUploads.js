const db = require('../db/db');
const path = require('path');

const showPdfDetails= () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT 
                brand_pdf_id, 
                brand_pdf_name,
                brand_pdf_path
               FROM brand_pdf
               WHERE is_deleted = 0`;


         db.query(query, (error, result) => {
            if (error) return reject(error);


            const response = result.map(item => ({
                brand_pdf_id: item. brand_pdf_id,
                brand_pdf_name: item.brand_pdf_name,
                brand_pdf_path:item.brand_pdf_path,
                pdf_url: `/brandPdfs/${path.basename(item.brand_pdf_path)}`,
            }));
            resolve(response);
        });
    });
};

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

const deleteByPdfId = (pdfId, updates) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE brand_pdf
            SET 
                is_deleted = COALESCE(?, is_deleted),
                deleted_by = COALESCE(?, deleted_by),
                deleted_on = COALESCE(?, deleted_on)
            WHERE brand_pdf_id = ?;
        `;

        const values = [
            updates.is_deleted || null,
            updates.deleted_by || null,
            updates.deleted_on || null,
            pdfId
        ];

        db.query(query, values, (error, result) => {
            if (error) return reject(error);

            resolve(result);
        });
    });
};

module.exports={
    uploadBrandPdfModel,
    editBrandPdfModel,
    showPdfDetails,
    deleteByPdfId
}