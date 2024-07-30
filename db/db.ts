import mongoose from 'mongoose';
import User, {UserItem} from './schemas/user-schema';
import Material, {MaterialItem} from './schemas/material-schema';
import Course, {CourseItem} from './schemas/course-schema';
import Comment, {CommentItem} from './schemas/comment-schema';
import config from '.././config';

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`).then(() => console.log('db Connected!'));


export default {
    getCourses: async ({page, limit}: {page: number, limit: number}) => Course.find().select('title description')
        .limit(limit)
        .skip(limit * page),
    createUser: async (login: string, pass: Buffer, email: string, salt: Buffer, isAdmin: boolean) => {
        const user = new User({login, pass, email, salt, firstName: '', lastName: '', courses: [], role: isAdmin? 'admin' : 'user'});
        await user.save();
    },
    getUserByLogin: async (login: string) => User.findOne({login}),
    getUserById: async (id: string) => User.findOne({_id: id}).select('firstName lastName login email courses role'),
    editUser: async (id: string, data: Partial<UserItem>) => User.findOneAndUpdate({_id: id}, { ...data }, { upsert: true, useFindAndModify: true }),
    deleteUser: async (id: string) => User.deleteOne({_id: id}),
    createCourse: async (courseData: CourseItem) => {
        const course = new Course(courseData);
        return await course.save();
    },
    getCourse: async (id: string) => Course.findOne({'_id': id}),
    editCourse: async (id: string, data: Partial<CourseItem>) => Course.findOneAndUpdate({_id: id}, { ...data }, { upsert: true, useFindAndModify: true }),
    deleteCourse: (id: string) => Course.deleteOne({_id: id}),
    getMaterials: async (ids: string[]) => Material.find({ '_id': { $in: ids } }),
    getMaterial: async (id: string) => Material.findOne({ '_id': id }),
    createMaterial: async (materialData: Partial<MaterialItem>) => {
        const material = new Material(materialData);
        return await material.save();
    },
    editMaterial: async (id: string, data: Partial<MaterialItem>) => Material.findOneAndUpdate({_id: id}, { ...data }, { upsert: true, useFindAndModify: true }),
    deleteMaterial: (id: string) => Material.deleteOne({_id: id}),
    getComments: async (ids: string[]) => Comment.find({ '_id': { $in: ids } }),
    getComment: async (id: string) => Comment.findOne({'_id': id}),
    createComment: async (commentData: Partial<CommentItem>) => {
        const comment = new Comment(commentData);
        return await comment.save();
    },
}
