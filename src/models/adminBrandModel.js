const db = require('../db/db');


const showAllProductBrandModel = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT 
        brand_id, 
        brand_name FROM 
        brand_list
        where is_deleted = 0;
        `; // Adjust the query if needed

        db.query(query, (error, result) => {
            if (error) return reject(error); // Handle database errors
            resolve(result); // Resolve with the result from the query
        });
    });
};



const addProductBrand = (brand_id, brand_name, created_on, created_by) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO brand_list (brand_id, brand_name, created_on, created_by) 
            VALUES (?, ?, ?, ?);
        `;

        const values = [
            brand_id, 
            brand_name, 
            created_on, 
            created_by
        ];

        db.query(query, values, (error, result) => {
            if (error) return reject(error); 
            resolve(result); 
        });
    });
};

const updateProductBrand  = (brand_id, updates) =>{
    return new Promise((resolve,reject)=>{
    
        const query = `UPDATE brand_list
                      SET 
                brand_name = COALESCE(?,  brand_name),
                modified_on = COALESCE(?, modified_on),
                modified_by = COALESCE(?, modified_by)
                WHERE brand_id = ?; 
        `;
        const values =[
          
            updates.brand_name || null,
            updates.modified_on,  
            updates.modified_by,
            brand_id
        ]
        db.query(query,values,(error, result)=>{
    
            if(error) return reject(error);
    
            resolve(result);
    
        })
    
    })
    };
    const deleteBrandById = (brand_id, updates) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE brand_list
                SET 
                    is_deleted = COALESCE(?, is_deleted),
                    deleted_by = COALESCE(?, deleted_by),
                    deleted_on = COALESCE(?, deleted_on)
                WHERE brand_id = ?;
            `;
    
            const values = [
                updates.is_deleted || null,
                updates.deleted_by || null,
                updates.deleted_on || null,
                brand_id
            ];
    
            db.query(query, values, (error, result) => {
                if (error) return reject(error);
    
                resolve(result);
            });
        });
    };

module.exports={
    showAllProductBrandModel,
    addProductBrand,
    updateProductBrand,
    deleteBrandById
}