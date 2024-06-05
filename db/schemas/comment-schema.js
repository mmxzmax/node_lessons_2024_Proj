const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Comment', new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    text:String,
    date:Date
}))

