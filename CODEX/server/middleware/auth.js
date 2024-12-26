const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    // console.log(req.headers)
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({message: 'Authorization header missing'});
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided'
        })
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        console.log(req.user);
        
        next();
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            message: 'Invalid token from verified middleware.'
        });
    }
};

module.exports = verifyToken;