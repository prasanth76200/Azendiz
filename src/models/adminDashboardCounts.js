const db = require('../db/db');

const totalCompanies = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS totalCompanies FROM company_details where is_deleted=1`;
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results[0].totalCompanies); // Access the count directly
        });
    });
};

module.exports = {
    totalCompanies,
};
