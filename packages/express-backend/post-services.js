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
    } else {
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

function findPostById(str) {
    return postModel.find({ post_id: str })
}

function findPostByCategories(categories) {
    return postModel.find({ categories: categories })
}

function deletePostById(id) {
    return postModel.findByIdAndDelete(id)
}

async function findSimilarPosts(searchString) {
    const posts = await postModel
        .find(
            { $text: { $search: `"${searchString}"` } },
            { score: { $meta: 'textScore' } }
        )
        .sort({ score: { $meta: 'textScore' } })

    return posts
}

export default {
    addPost,
    getPost,
    findPostById,
    findPostByCategories,
    deletePostById,
    findSimilarPosts,
}
