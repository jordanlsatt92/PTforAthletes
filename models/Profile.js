/**
 * @author Jordan Satterfield
 * @description Implements a profile model for profiles in the database
 * using Mongoose (Mongo DB modeling tool). Requires the user ID and
 * user activities/interests (e.g. Running, Cycling, Climbing).
 */
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    activities: {
        type: [String],
        required: true
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);