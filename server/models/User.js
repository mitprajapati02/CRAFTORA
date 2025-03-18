const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,   
        required: [true, 'user name must be provided'],
    },
    email: {
        type: String,
        required: [true, 'user email must be provided'],
        unique: true,
        lowercase: true,        
    }
    }
    ,{timestamps: true})

module.exports = mongoose.model('User', userSchema)