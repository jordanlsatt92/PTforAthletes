/**
 * @author Jordan Satterfield
 * @description Implements a symptom model for symptoms in the database
 * using Mongoose (Mongo DB modeling tool). Requires the user ID, symptom name,
 * effected anatomy (e.g. hips, hamstring), symptom description. Updates are stored
 * as embedded documents within the symptom document. Updates require a description.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    effected_parts:{
        type:[String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    updates: [
        {
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('symptom', SymptomSchema);