const jwtService = require('../services/jwtService');

/**
 * Middleware to protect routes with JWT authentication
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @param {Function} next - Callback to proceed to the next middleware
 * @param {Array} allowedRoles
 */
const authenticate = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.headers || !req.headers['authorization']) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Authorization header missing' }));
            return;
        }

        const token = req.headers['authorization'].split(' ')[1];

        try {
            const decoded = jwtService.verifyToken(token);
            req.user = decoded; // Add user info to the request object

            // Check if the user has the required role
            if (allowedRoles && !allowedRoles.includes(decoded.role)) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Forbidden: Insufficient permissions' }));
                return;
            }

            next(); // User has the correct role, proceed to the next middleware
        } catch (error) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid or expired token' }));
        }
    };
};

module.exports = { authenticate };
