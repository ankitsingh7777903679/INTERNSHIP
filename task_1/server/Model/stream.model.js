const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, // Prevent duplicate streams like "sci" and "sci"
        trim: true 
    }
}, { timestamps: true });

let streamModel = mongoose.model('Stream', streamSchema);
module.exports = streamModel;