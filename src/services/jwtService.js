const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

let PRIVATE_KEY, PUBLIC_KEY; // Declare variables outside the block

try {
    PRIVATE_KEY = fs.readFileSync(
         'certs/private.key',
        'utf8'
    );
    PUBLIC_KEY = fs.readFileSync(
         'certs/public.key',
        'utf8'
    );
} catch (error) {
    console.error('Error loading RSA keys:', error.message);
    process.exit(1); // Exit the process if keys cannot be loaded
}

const EXPIRATION_TIME =  '7d';

/**
 * Generate a JWT token using RS256 with role-based authorization
 */
const generateToken = (payload, role) => {
    try {
        const tokenPayload = { ...payload, role };
        return jwt.sign(tokenPayload, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: EXPIRATION_TIME });
    } catch (error) {
        console.error('Error generating token:', error.message);
        throw error;
    }
};

/**
 * Verify a JWT token using RS256
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
    } catch (error) {
        console.error('Error verifying token:', error.message);
        throw error;
    }
};

module.exports = { generateToken, verifyToken };
