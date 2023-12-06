// post.js

import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        post_id: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        user_name: {
            type: String,
            required: true,
            trim: true,
            unique: false,
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
            Kitchen: {
                type: Boolean,
                default: false,
            },
            Desk: {
                type: Boolean,
                default: false,
            },
            Electronic: {
                type: Boolean,
                default: false,
            },
        },
        pickup_or_delivery: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: 'posts_list' }
)

PostSchema.index({ title: 'text', description: 'text' })

const Post = mongoose.model('Post', PostSchema)

export default Post
