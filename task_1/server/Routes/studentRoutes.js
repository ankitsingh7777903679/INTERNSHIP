let {test, studentInsert, studentList, studentListOne, studentUpdate, studentDelete, studentSetStatus} = require('../Controllres/studentsControllers')
let express = require('express')
let StudentRouter = express.Router()
StudentRouter.get('/test', test)
StudentRouter.post('/insert', studentInsert)
StudentRouter.get('/list', studentList)
StudentRouter.get('/listOne/:id', studentListOne)
StudentRouter.put('/update/:id', studentUpdate)
StudentRouter.put('/delete/:id', studentDelete)
StudentRouter.put('/setStatus/:id', studentSetStatus)


module.exports = StudentRouter