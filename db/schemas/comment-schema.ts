import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type CommentItem = {
    author: string,
    text:string,
    date:Date
}

export default mongoose.model('Comment', new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    text:String,
    date:Date
}))

