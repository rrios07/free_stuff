// post.js

import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        post_id: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
        },
        user_id: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
        },
        user_name: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        categories: {
            type: [String],
            required: true,
            trim: true,
        },
        pickup_or_dilivery: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    { collection: 'posts_list' }
)

const Post = mongoose.model('Post', PostSchema)

export default Post