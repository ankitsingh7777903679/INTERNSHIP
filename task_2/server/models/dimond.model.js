const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dimondSchema = new Schema({
    shape:{
        type:String,
        required:true,
        // unique:true,
        enum:['round','pear','heart']
    },
    color:{
        type:String,
        required:true,
        // unique:true,
        enum:['G','H','I','J'],
    },
    clarity:{
        type:String,
        required:true,
        // unique:true,
        enum:['VVS1','VVS2','VS1','SI1']
    },
    from:{
        type:Number,
        required:true,
        // unique:true,
    },
    to:{
        type:Number,
        required:true,
        // unique:true,
    },
    price:{
        type:Number,
        required:true,
    }
})

const dimondModel = mongoose.model('dimond', dimondSchema)
module.exports = dimondModel