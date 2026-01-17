const express = require('express')
const { signup, login, getAllUser, updateUserPermissions, me, changeUserStatus } = require('../controllers/auth.controller')
const { verifyToken, requireAdmin } = require('../middleware/authMiddleWare')
const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/me', verifyToken, me)
authRouter.get('/getAllUser', verifyToken, requireAdmin, getAllUser)
authRouter.post('/updateUserPermissions/:id', verifyToken, requireAdmin, updateUserPermissions)
authRouter.post('/changeUserStatus/:id', verifyToken, requireAdmin, changeUserStatus)

module.exports = authRouter