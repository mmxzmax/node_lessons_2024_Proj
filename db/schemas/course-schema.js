const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Course', new Schema({
    title:String,
    description:String,
    materials:[{type: Schema.Types.ObjectId, ref: 'Material'}],
    comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}]
}))

