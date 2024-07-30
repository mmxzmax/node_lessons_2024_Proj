import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type UserItem = {
    firstName: string,
    lastName: string,
    login: string,
    email: string,
    pass: Buffer,
    role: string,
    salt: Buffer,
    courses: string,
}

export default mongoose.model('User', new Schema({
    firstName: String,
    lastName: String,
    login: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    pass: {type: Buffer, required: true},
    role: String,
    salt: {type: Buffer, required: true},
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
}))

