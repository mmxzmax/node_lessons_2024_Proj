import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type CourseItem = {
    title:string,
    description:string,
    materials:string[],
    comments:string[]
}

export default mongoose.model('Course', new Schema({
    title:String,
    description:String,
    materials:[{type: Schema.Types.ObjectId, ref: 'Material'}],
    comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}]
}))

