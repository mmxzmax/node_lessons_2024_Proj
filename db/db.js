const mongoose = require('mongoose');
const User = require('./schemas/user-schema');
const Material = require('./schemas/material-schema');
const Course = require('./schemas/course-schema');
const Media = require('./schemas/media-schema');
const Comment = require('./schemas/comment-schema');


const connection = mongoose.connect('mongodb://127.0.0.1:27017/learn_proj_db').then(() => console.log('db Connected!'));


module.exports = {
    getCourses: async ({page, limit}) => Course.find()
        .limit(limit)
        .skip(limit * page),
    getCourse: async (id) => Course.findOne({'_id': id}),
}
