import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title :{
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    },
    image :{
        type: String
    }
},{timestamps:true});

const Post = mongoose.model('Post', postSchema)
export default Post