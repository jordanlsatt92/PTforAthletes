/**
 * @author Jordan Satterfield
 * @description Implements a video model for videos in the database
 * using Mongoose (Mongo DB modeling tool). Requires url, video title,
 * related anatomy (e.g. hips, hamstring), and the video description.
 */
const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    related_parts: {
        type: [String],
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('video', VideoSchema);