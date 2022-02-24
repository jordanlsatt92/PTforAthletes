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