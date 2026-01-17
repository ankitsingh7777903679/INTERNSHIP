const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {
    // console.log("Verifying token...", req.body);
    const header = req.headers.authorization;
    // console.log("Authorization header:", header);

    if(!header) return res.status(401).send({status:false, message:'No token provided'});
    const token = header.split(' ')[1];
    if(!token){
        return res.status(401).send({status:false, message:'No token provided'});
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        // 2. Find User in DB
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).send({ status: false, message: 'User not found' });
        }

        // 3. CHECK VERSION: Does Token Version match DB Version?
        if (decoded.tokenVersion !== user.tokenVersion) {
            // If they don't match, it means Admin changed permissions!
            return res.status(401).send({ 
                status: false, 
                message: 'Session expired. Permissions changed. Please login again.' 
            });
        }


        req.user = user;
        next();
    }catch(err){
        return res.status(401).send({status:false, message:'unauthorized access'});
    }
}

const checkAccess = (requiredPerm) => {
    return (req, res, next) => {
        const { role, permissions = [] } = req.user;

        // Admins bypass fine-grained checks.
        if (role === 'admin') {
            return next();
        }

        // Permissions are stored as an array of strings.
        if (permissions.includes(requiredPerm)) {
            return next();
        }

        return res.status(403).send({ status: false, message: 'Permission Denied. Contact Admin.' });
    }
}

// Require admin role explicitly (useful for user-management routes)
const requireAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') {
        return next();
    }
    return res.status(403).send({ status: false, message: 'Admin only' });
}

module.exports = { verifyToken, checkAccess, requireAdmin }