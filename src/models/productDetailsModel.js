const db = require('../db/db');



const showAllProductDetailsModel = () => {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT 
            pd.product_id,
            pd.product_name,
            pd.category_id, 
            pd.brand_id, 
            bl.brand_name,
            pd.product_sku_code,
            pd.product_description,
            pd.product_price,
            pd.product_lead_time,
            pd.product_stock,
            pd.product_remarks
        FROM 
            product_details pd
        LEFT JOIN 
            brand_list bl ON pd.brand_id = bl.brand_id
        WHERE
            pd.is_deleted = 0;
        `; 
        db.query(query, (error, result) => {
            if (error) return reject(error);
            resolve(result); 
        });
    });
};





const addProductDetails = ( product_id,category_id,brand_id, product_name,product_sku_code,product_description,product_price,product_lead_time,product_stock,product_remarks, created_on, created_by) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO product_details(product_id,category_id,brand_id, product_name,product_sku_code,product_description,product_price,product_lead_time,product_stock,product_remarks, created_on, created_by) 
            VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?);
        `;

        const values = [
            product_id,category_id,brand_id, product_name,product_sku_code,product_description,product_price,product_lead_time,product_stock,product_remarks, created_on, created_by
        ];

        db.query(query, values, (error, result) => {
            if (error) return reject(error); 
            resolve(result); 
        });
    });
};

const updateProductDetails  = (product_id, updates) =>{
    return new Promise((resolve,reject)=>{
    
        const query = `UPDATE product_details
                      SET 
                category_id = COALESCE(?,  category_id),
                brand_id = COALESCE(?,  brand_id),
                product_name = COALESCE(?, product_name),
                product_sku_code = COALESCE(?, product_sku_code),
                product_description = COALESCE(?, product_description),
                product_price = COALESCE(?, product_price),
                product_lead_time = COALESCE(?, product_lead_time),
                product_stock = COALESCE(?, product_stock),
                product_remarks= COALESCE(?,  product_remarks),
                modified_on = COALESCE(?, modified_on),
                modified_by = COALESCE(?, modified_by)
                WHERE product_id = ?; 
        `;
        const values = [
            updates.category_id || null,
            updates.brand_id || null,
            updates.product_name || null,
            updates.product_sku_code || null,
            updates.product_description || null,
            updates.product_price || null,
            updates.product_lead_time || null,
            updates.product_stock || null,
            updates.product_remarks || null,
            updates.modified_on || null,
            updates.modified_by || null,
            product_id
        ];
        db.query(query,values,(error, result)=>{
    
            if(error) return reject(error);
    
            resolve(result);
    
        })
    
    })
    };
    const deleteProductDetailsById = (product_id, updates) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE product_details
                SET 
                    is_deleted = COALESCE(?, is_deleted),
                    deleted_by = COALESCE(?, deleted_by),
                    deleted_on = COALESCE(?, deleted_on)
                WHERE product_id = ?;
            `;
    
            const values = [
                updates.is_deleted || null,
                updates.deleted_by || null,
                updates.deleted_on || null,
                product_id
            ];
    
            db.query(query, values, (error, result) => {
                if (error) return reject(error);
    
                resolve(result);
            });
        });
    };

module.exports={
    showAllProductDetailsModel,
    addProductDetails,
    updateProductDetails,
    deleteProductDetailsById
}