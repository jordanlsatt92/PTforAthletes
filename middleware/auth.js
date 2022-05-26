/**
 * @author Jordan Satterfield
 * @description Verifies user has a JSON web token and that the
 * token is valid. If the token is not valid, returns error message
 * stating that there is no token and authorization is denied.
 */
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // Verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({ msg: 'Token is not valid' });
    }
}