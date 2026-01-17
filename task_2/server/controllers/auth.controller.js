const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const { validationSignup } = require('../utils/validation/signup');
const { validationLogin } = require('../utils/validation/login');
const  {msg}  = require('../utils/messages/api');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const { error } = validationSignup(req.body);
    if (error) {
        return res.status(HTTP_RESPONSES.BAD_REQUEST).send({
            status: false,
            message: error.details[0].message //error
        });
    }


    try {
        const { username, email, password } = req.body;
        // console.log(req.body)
        const existingUser = await userModel.findOne({ email, status: { $ne: 'deleted' } });
        if (existingUser) {
            return res.send({ status: false, message: msg.user.userExists });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            role: 'user',
            permissions: ['Diamond_read', 'stoneGroup_read'],
            status: 'active'
        });
        await newUser.save();
        res.send({ status: true, message: msg.user.signupSuccess });
    } catch (err) {
        res.send({ status: false, message: msg.user.signupError, error: err });
    }

}



const login = async (req, res) => {
    const { error } = validationLogin(req.body);
    if (error) {
        return res.send({
            status: false,
            message: error.details[0].message //error
        });
    }

    try {
        const { email, password } = req.body;
        // console.log(req.body)
        const userStatus = await userModel.findOne({ email, status: { $ne: 'deleted' } });
        // console.log(userStatus)
        if (!userStatus) {
            return res.send({ status: false, message:  msg.user.notFound});
        }

        const isValidPassword = await bcrypt.compare(password, userStatus.password);
        // console.log('Password validation:', isValidPassword)
        if (!isValidPassword) {
            return res.send({ status: false, message: msg.user.invalidCredentials });
        }

        // console.log('JWT_SECRET:', JWT_SECRET ? 'Loaded' : 'MISSING');

        const token = jwt.sign({
            id: userStatus._id,
            role: userStatus.role,
            permissions: userStatus.permissions,
            tokenVersion: userStatus.tokenVersion // <--- IMPORTANT
        }, JWT_SECRET, { expiresIn: '24h' });

        // console.log('Login successful, token:', token);

        return res.send({
            status: true,
            message: msg.user.loginSuccess,
            token,
            user: {
                username: userStatus.username,
                email: userStatus.email,
                role: userStatus.role,
                permissions: userStatus.permissions,
                status: userStatus.status,
                tokenVersion: userStatus.tokenVersion // <--- IMPORTANT
            }
        })
    } catch (err) {
        // console.error('Login error:', err);
        res.send({ status: false, message: msg.user.noLogin, error: err.message });
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find({ role: 'user' }).select('-password');
        res.send({ status: true, data: users })
    } catch (err) {
        res.send({ status: false, message: msg.user.getAllUsersError, error: err });
    }
}

const updateUserPermissions = async (req, res) => {
    const { permissions, status } = req.body;
    let { id } = req.params;
    try {
        const user = await userModel.findByIdAndUpdate({ _id: id }, { permissions, status, $inc: { tokenVersion: 1 } })
        res.send({ status: true, message: msg.user.updatePermissionsSuccess });
    } catch (err) {
        res.send({ status: false, message: msg.user.updatePermissionsError, error: err });
    }
}

const changeUserStatus = async (req, res) => {

    const { status} = req.body;
    let { id } = req.params;
    try {
        const user = await userModel.findByIdAndUpdate({ _id: id }, { status })
        res.send({ status: true, message: msg.user.updateStatusSuccess });
    } catch (err) {
        res.send({ status: false, message: 'Error updating status', error: err });
    }

}

// Authenticated session check; 401 handled by verifyToken middleware
const me = async (req, res) => {
    const user = await userModel.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).send({ status: false, message: msg.user.notFound });
    }
    res.send({ status: true, user });
}

module.exports = { signup, login, getAllUser, updateUserPermissions, changeUserStatus, me }