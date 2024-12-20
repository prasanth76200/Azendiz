const db = require('../db/db');

const totalCompanies = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS totalCompanies FROM company_details where is_deleted=0`;
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results[0].totalCompanies); // Access the count directly
        });
    });
};

const totalProdcuts = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS totalProducts FROM product_details where is_deleted=0`;
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results[0].totalProducts); // Access the count directly
        });
    });
};
const totalBrands = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS totalBrands FROM brand_list where is_deleted=0`;
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results[0].totalBrands); // Access the count directly
        });
    });
};
const totalCatagory = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS totalCatagory FROM product_categories where is_deleted=0`;
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results[0].totalCatagory); // Access the count directly
        });
    });
};


module.exports = {
    totalCompanies,
    totalProdcuts,
    totalCatagory,
    totalBrands
};
