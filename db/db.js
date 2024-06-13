const mongoose = require('mongoose');
const User = require('./schemas/user-schema');
const Material = require('./schemas/material-schema');
const Course = require('./schemas/course-schema');
const Comment = require('./schemas/comment-schema');
const config = require('.././config');

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`).then(() => console.log('db Connected!'));


module.exports = {
    getCourses: async ({page, limit}) => Course.find().select('title description')
        .limit(limit)
        .skip(limit * page),
    createUser: async (login, pass, email, salt, isAdmin) => {
        const user = new User({login, pass, email, salt, firstName: '', lastName: '', courses: [], role: isAdmin? 'admin' : 'user'});
        await user.save();
    },
    getUserByLogin: async (login) => User.findOne({login}),
    getUserById: async (id) => User.findOne({_id: id}).select('firstName lastName login email courses role'),
    editUser: async (id, data) => User.findOneAndUpdate({_id: id}, { ...data }, { upsert: true, useFindAndModify: true }),
    deleteUser: (id) => User.deleteOne({_id: id}),
    createCourse: async (courseData) => {
        const course = new Course(courseData);
        return await course.save();
    },
    getCourse: async (id) => Course.findOne({'_id': id}),
    editCourse: async (id, data) => Course.findOneAndUpdate({_id: id}, { ...data }, { upsert: true, useFindAndModify: true }),
    deleteCourse: (id) => Course.deleteOne({_id: id}),
    getMaterials: async (ids) => Material.find({ '_id': { $in: ids } }),
    getMaterial: async (id) => Material.findOne({ '_id': id }),
    createMaterial: async (materialData) => {
        const material = new Material(materialData);
        return await material.save();
    },
    editMaterial: async (id) => Material.findOneAndUpdate({_id: id}, { ...data }, { upsert: true, useFindAndModify: true }),
    deleteMaterial: (id) => Material.deleteOne({_id: id}),
    getComments: async (ids) => Comment.find({ '_id': { $in: ids } }),
    getComment: async (id) => Comment.findOne({'_id': id}),
    createComment: async (commentData) => {
        const comment = new Comment(commentData);
        return await comment.save();
    },
}
