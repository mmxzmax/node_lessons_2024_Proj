const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Media', new Schema({
    title: String,
    body:String,
    media:[{type: Schema.Types.ObjectId, ref: 'Media'}],
}))

