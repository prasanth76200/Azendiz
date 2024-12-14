const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    console.log('Seeding database...');

    try {
        // Optional: Delete existing data to avoid duplicates
        // await connection.query('DELETE FROM company_details');
        // await connection.query('DELETE FROM admin');

        // Seed admin data
        const admins = [
            {
                admin_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                admin_userName: 'admin_user',
                admin_password: 'secure_password',
                created_by: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
            },
        ];

        for (const admin of admins) {
            await connection.query(
                `INSERT IGNORE INTO admin (admin_id, admin_userName, admin_password, created_by) VALUES (?, ?, ?, ?)`,
                [admin.admin_id, admin.admin_userName, admin.admin_password, admin.created_by]
            );
        }

        // Seed company details data
        const companies = [
            {
                company_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                attender_name: 'John Doe',
                attender_phone: '9952148197',
                admin_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                company_name: 'Example Company',
                company_address: '123 Example Street',
                country:'Singapore',
                postal_code:'608011',
                company_userName: 'example_user',
                company_password: 'secure_password',
                created_on: new Date(),
                status: 1,
            },
        ];

        for (const company of companies) {
            await connection.query(
                `INSERT INTO company_details 
                (company_id, attender_name, attender_phone, admin_id, company_name, company_address, company_userName, company_password, country, postal_code, created_on, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    company.company_id,
                    company.attender_name,
                    company.attender_phone,
                    company.admin_id,
                    company.company_name,
                    company.company_address,
                    company.company_userName,
                    company.company_password,
                    company.country,
                    company.postal_code,  
                    company.created_on,
                    company.status,
                ]
            );
        }

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    } finally {
        await connection.end();
    }
};

// Run the seed function
seedDatabase();
