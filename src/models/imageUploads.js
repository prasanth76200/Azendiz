const db = require('../db/db');
const path = require('path');



const uploadImageModel =(imageId, product_id, image_name, image_path_name, created_by, createdOn)=>{
return new Promise((resolve,reject)=>{
    const query =`INSERT INTO product_images (image_id, product_id, image_name, image_path_name, created_by, created_on)
         VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [imageId, product_id, image_name, image_path_name, created_by, createdOn],(error,result)=>{
        if(error) return reject(error);
        resolve(result);
    })
})
}

const showImagesById = (product_id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT pi.image_id, 
                        pi.image_name, 
                        pi.image_path_name,
                        pd.product_description
                       FROM product_images pi
                       JOIN product_details pd
                       ON pi.product_id = pd.product_id
                       WHERE pi.product_id = ?`;

         db.query(query, [product_id], (error, result) => {
            if (error) return reject(error);


            const response = result.map(item => ({
                image_id: item.image_id,
                image_name: item.image_name,
                image_path_name:item.image_path_name,
                image_url: `/uploads/${path.basename(item.image_path_name)}`,
                product_description: item.product_description
            }));
            resolve(response);
        });
    });
};

const editImageModel = (image_id, updates) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE product_images 
            SET image_name = COALESCE(?, image_name), 
                image_path_name = COALESCE(?, image_path_name), 
                modified_by = COALESCE(?, modified_by), 
                modified_on = COALESCE(?, modified_on)
            WHERE image_id = ? `;

        const values = [
            updates.image_name || null,  // If no new image name, use the old value
            updates.image_path_name || null, 
            updates.modified_by, // If no new path, use the old value
            updates.modified_on,  // Updated modification timestamp
            image_id,  // The image ID to match for updating

        ];

        db.query(query, values, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};


module.exports={
    uploadImageModel,
    showImagesById,
    editImageModel
}