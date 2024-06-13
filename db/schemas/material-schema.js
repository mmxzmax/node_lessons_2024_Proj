const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Material', new Schema({
    type: String,
    fileName: String,
}))

