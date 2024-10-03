const jwt = require('jsonwebtoken');
const { JWT_SECRET} = require('../../config/config');
const { sendUnauthorizedResponse } = require('../../lib/Common');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userData = decoded;
        next();
    } catch {
        sendUnauthorizedResponse(res);
    }
};