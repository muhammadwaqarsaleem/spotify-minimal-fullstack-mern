const mongoose = require('mongoose'); // to create db schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'artist'],
        default:'user',
    }
    
})

const userModel = mongoose.model("user", userSchema); // creates a table with name user and assigns it this schema

module.exports = userModel;