let express = require('express')
const { addStreams, getStreams, addClass, getClasses, addSubject, getSubjects } = require('../Controllres/acadmicControllers')
let acadmicRoutes = express.Router()

acadmicRoutes.post('/insertStream', addStreams)
acadmicRoutes.get('/getStreams', getStreams)
acadmicRoutes.post('/insertClass', addClass)
acadmicRoutes.get('/getClasses', getClasses)
acadmicRoutes.post('/insertSubject', addSubject)
acadmicRoutes.get('/getSubjects', getSubjects)

module.exports = acadmicRoutes

