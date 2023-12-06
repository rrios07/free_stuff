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

async function getPost(post_id) {
    console.log('getting post')
    let promise
    if (post_id === undefined) {
        try {
            let query = postModel.find({}) // Initialize the query without conditions

            const result = await query.exec() // Execute the query and await the result
            console.log(result)
            return result
        } catch (error) {
            throw error
        }
    } else if (post_id) {
        promise = findPostById(post_id)

        return promise
    }

    function findPostById(id) {
        return postModel.findById(id)
    }
}
function addPost(post) {
    const postToAdd = new postModel(post)
    const promise = postToAdd.save()
    return promise
}

function findPostByString(str) {
    return postModel.find({ title: str })
}

function findPostByCategories(categories) {
    return postModel.find({ categories: categories })
}

function deletePostById(id) {
    return postModel.findByIdAndDelete(id)
}

export default {
    addPost,
    getPost,
    findPostByString,
    findPostByCategories,
    deletePostById,
}
