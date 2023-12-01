//post-services.js
import mongoose from 'mongoose'
import postModel from './post.js'
import dotenv from 'dotenv'

dotenv.config()
mongoose.set('debug', true)

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewPostParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error))


function getPost(post_id) {
    let promise
    if (post_id === undefined ) {
        promise = postModel.find()
    } else if (post_id) {
        promise = findPostByID(post_id)

    return promise
}

function findPostById(id) {
    return postModel.findById(id)
}

function addPost(post) {
    console.log(post)
    // if (user.email.includes('calpoly.edu')) {
    //     user['student'] = true
    // } else {
    //     user['student'] = false
    // }
    const postToAdd = new postModel(post)
    const promise = postToAdd.save()
    return promise
}

function findPostByTitle(title) {
    return postModel.find({ title: title })
}

function findPostByCategories(categories) {
    return postModel.find({ categories: categories })
}

function deletePostById(id) {
    return postModel.findByIdAndDelete(id)
}

export default {
    addPost,
    getPosts,
    findPostById,
    findPostByTitle,
    findPostByCategories,
    deletePostById,
}