const adminService = require('../services/adminService');



const getAdminLoginFieldController = async (req, res) => {
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

            const { admin_userName, admin_password } = parsedBody;          
            if (!admin_userName || !admin_password) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Username and password are required' }));
            }

           
            const authenticationResult = await adminService.getLoginFieldAdminService(admin_userName, admin_password);
            console.log(authenticationResult);
            if (authenticationResult) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Login successful' , admin_id: authenticationResult.admin_id }));
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid username or password' }));
            }
        });
    } catch (error) {
        console.error('Error processing login:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
};


module.exports={
    getAdminLoginFieldController,
}