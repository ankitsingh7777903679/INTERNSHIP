const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/authtestapp`)

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
})
userModel = mongoose.model('users', userSchema)

module.exports = {userModel};