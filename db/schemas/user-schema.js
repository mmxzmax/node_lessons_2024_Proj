const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    firstName: String,
    lastName: String,
    login: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    pass: {type: Buffer, required: true},
    role: String,
    salt: {type: Buffer, required: true},
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
}))

