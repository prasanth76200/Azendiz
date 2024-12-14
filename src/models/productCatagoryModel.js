const db = require('../db/db');


const showAllProductCatagoryModel = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT 
        category_id, 
        category_name FROM 
        product_categories
        where is_deleted = 0;
        `; // Adjust the query if needed

        db.query(query, (error, result) => {
            if (error) return reject(error); // Handle database errors
            resolve(result); // Resolve with the result from the query
        });
    });
};



const addProductCatagory = (category_id, category_name, created_on, created_by) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO product_categories (category_id, category_name, created_on, created_by) 
            VALUES (?, ?, ?, ?);
        `;

        const values = [
            category_id, 
            category_name, 
            created_on, 
            created_by
        ];

        db.query(query, values, (error, result) => {
            if (error) return reject(error); 
            resolve(result); 
        });
    });
};

const updateProductCatagory  = (category_id, updates) =>{
    return new Promise((resolve,reject)=>{
    
        const query = `UPDATE product_categories
                      SET 
                category_name = COALESCE(?,  category_name),
                modified_on = COALESCE(?, modified_on),
                modified_by = COALESCE(?, modified_by)
                WHERE category_id = ?; 
        `;
        const values =[
          
            updates.category_name || null,
            updates.modified_on,  
            updates.modified_by,
            category_id
        ]
        db.query(query,values,(error, result)=>{
    
            if(error) return reject(error);
    
            resolve(result);
    
        })
    
    })
    };
    const deleteCatagoryById = (category_id, updates) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE product_categories
                SET 
                    is_deleted = COALESCE(?, is_deleted),
                    deleted_by = COALESCE(?, deleted_by),
                    deleted_on = COALESCE(?, deleted_on)
                WHERE category_id = ?;
            `;
    
            const values = [
                updates.is_deleted || null,
                updates.deleted_by || null,
                updates.deleted_on || null,
                category_id
            ];
    
            db.query(query, values, (error, result) => {
                if (error) return reject(error);
    
                resolve(result);
            });
        });
    };

module.exports={
    addProductCatagory,
    showAllProductCatagoryModel,
    updateProductCatagory,
    deleteCatagoryById
}