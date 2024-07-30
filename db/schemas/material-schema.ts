import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type MaterialItem = {
    type: String,
    fileName: String,
}

export default mongoose.model('Material', new Schema({
    type: String,
    fileName: String,
}))

