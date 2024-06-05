const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    firstName:String,
    lastName:String,
    login:String,
    email:String,
    pass:String,
    role:String,
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
}))

