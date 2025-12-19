let mongoose = require('mongoose')
let Schema = mongoose.Schema

let studentSubjectSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    }
},{timestamps:true})

let subjectModel = mongoose.model('Subject',studentSubjectSchema)
module.exports = subjectModel