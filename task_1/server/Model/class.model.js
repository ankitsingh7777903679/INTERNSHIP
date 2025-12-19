let mongoose = require('mongoose')
let Schema = mongoose.Schema

let studentClassSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    }
},{timestamps:true})

let classModel = mongoose.model('Class',studentClassSchema)
module.exports = classModel