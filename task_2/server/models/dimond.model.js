const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dimondSchema = new Schema({
    stockId:{
        type:String,
        required:true,
        unique:true
    },
    shape:{
        type:String,
        required:true,
        enum:['round','pear','heart']
    },
    color:{
        type:String,
        required:true,
        enum:['G','H','I','J'],
    },
    clarity:{
        type:String,
        required:true,
        enum:['VVS1','VVS2','VS1','SI1']
    },
    weight:{
        type:Number,
        required:true,
    },
    rap:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
    pricePerCarat:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    }
    

})

const dimondModel = mongoose.model('dimondDetails', dimondSchema)
module.exports = dimondModel