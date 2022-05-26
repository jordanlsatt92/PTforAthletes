/**
 * @author Jordan Satterfield
 * @description Implements a user model for users in the database
 * using Mongoose (Mongo DB modeling tool). Requires user's name,
 * email, password, security question answer.
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    security_question: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);