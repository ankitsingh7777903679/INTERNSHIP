const mongoose = require('mongoose')
const { schema } = require('./stoneGroup.model')
const Permissions = {
    DIAMOND_READ : 'Diamond_read',
    DIAMOND_WRITE : 'Diamond_write',
    DIAMOND_DELETE : 'Diamond_delete',
    DIAMOND_UPDATE : 'Diamond_update',
    STONEGROUP_READ : 'stoneGroup_read',
    STONEGROUP_WRITE : 'stoneGroup_write',
    STONEGROUP_DELETE : 'stoneGroup_delete',
    STONEGROUP_UPDATE : 'stoneGroup_update'
}
const Schema = mongoose.Schema
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    permissions: {
        type: [String],
        enum: Permissions,
        default: [Permissions.DIAMOND_READ,  Permissions.STONEGROUP_READ]
    },
    // ADD THIS FIELD
    tokenVersion: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'deleted']
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel