const companyService = require('../services/companyService');
const jwtService = require('../services/jwtService');


const getCompanieByIdController = async (req, res) => {
    try {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            if (!body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Request body is required' }));
            }

            let parsedBody;
            try {
                parsedBody = JSON.parse(body); // Attempt to parse JSON
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }

            const { company_id } = parsedBody;

            // Validate input
            if (!company_id) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Company ID is required' }));
            }

            const companies = await companyService.getCompanieByIdService(company_id);
            console.log("Fetched companies:", companies);

            if (!res.headersSent) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(companies));
            }
        });
    } catch (error) {
        console.error('Error fetching companies:', error.message);

        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to fetch companies' }));
        }
    }
};

const getLoginFieldController = async (req, res) => {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            if (!body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Request body is required' }));
            }

            let parsedBody;
            try {
                parsedBody = JSON.parse(body); 
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }

            const { company_userName, company_password } = parsedBody;

            if (!company_userName || !company_password) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Username and password are required' }));
            }

            try {
                const authenticationResult = await companyService.authenticateUser(company_userName, company_password);

                if (authenticationResult) {
                    const { token, company_id } = authenticationResult;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Login successful', token, company_id }));
                }
            } catch (error) {
                if (error.message === 'Invalid credentials') {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Invalid username or password' }));
                }
                throw error; // Rethrow for unexpected errors
            }
        });
    } catch (error) {
        console.error('Error processing login:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
};





module.exports = { getCompanieByIdController,getLoginFieldController };
