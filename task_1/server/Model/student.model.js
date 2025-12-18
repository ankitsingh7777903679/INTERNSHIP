let mongoose = require('mongoose')
let Schema = mongoose.Schema

let studentScheema = new Schema({
    name:{
        type:String,
        trquired:true
    },
    rollno:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','active', 'suspended', 'delete'],
        default:'pending'
    }
},{timestamps:true})

studentScheema.index(
    {email:1},
    {unique:true,
        partialFilterExpression:{status:{$ne:'delete'}}
    }
)

let studentModel = mongoose.model('student', studentScheema)
module.exports = studentModel