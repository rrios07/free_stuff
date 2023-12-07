/*file for testing backend auxiliary functions that handle mongoose
 *API calls */
import mut from './user-services.js' // MUT = Module Under Test
import mut2 from './post-services.js'
import mongoose from 'mongoose'

let stud_id
let post_id
let non_stud_id

test('Testing creating new post', () => {
    const user = {
        categories: { Kitchen: true, Desk: false, Electronic: false },
        post_id: '12345',
        user_name: 'new_user',
        title: 'things',
        description: 'here are some things',
        pickup_or_delivery: 'Pickup',
    }
    return mut2.addPost(user).then((data) => {
        post_id = data._id
        console.log(data)
        expect(data.user_name).toBe('new_user')
    })
})

test('Testing getPost for no id', () => {
    return mut2.getPost(undefined).then((data) => {
        console.log(data)
        expect(data).toBeDefined()
    })
})

test('Testing getPost with id', () => {
    return mut2.getPost(post_id).then((data) => {
        //console.log(data)
        expect(data.user_name).toBe('new_user')
    })
})

test('Testing findPostById', () => {
    return mut2.findPostById('12345').then((data) => {
        console.log(data)
        expect(data[0].user_name).toBe('new_user')
    })
})

test('Testing findPostByCategories', () => {
    return mut2
        .findPostByCategories({ Kitchen: true, Desk: false, Electronic: false })
        .then((data) => {
            console.log(data)
            expect(data).toBeDefined()
        })
})

test('Testing findSimilarPosts', async () => {
    const data = await mut2.findSimilarPosts('thing')
    console.log(data)
    expect(data).toBeDefined()
})

test('Testing deletePostById', () => {
    return mut2.deletePostById(post_id).then((data) => {
        expect(data).toBeDefined()
    })
})

test('Testing creating new non-student user', () => {
    const user = {
        username: 'new_user',
        email: 'fake@gmail.com',
        name: 'John Doe',
        address: '12 Fake Lane',
        zip: 99999,
    }
    return mut.addUser(user).then((data) => {
        stud_id = data._id
        //console.log(stud_id)
        expect(data.username).toBe('new_user')
    })
})

test('Testing creating new student user', () => {
    const user = {
        username: 'non_student',
        email: 'fake@calpoly.edu',
        name: 'John Doe',
        address: '12 Fake Lane',
        zip: 99999,
    }
    return mut.addUser(user).then((data) => {
        non_stud_id = data._id
        //console.log(non_stud_id)
        expect(data.username).toBe('non_student')
    })
})

test('Testing getUsers for all users', () => {
    return mut.getUsers(undefined, undefined).then((data) => {
        //console.log(data)
        expect(data).toBeDefined()
    })
})

test('Testing getUsers with username', () => {
    return mut.getUsers('new_user', undefined).then((data) => {
        expect(data[0].email).toBe('fake@gmail.com')
    })
})

test('Testing getUsers with email', () => {
    return mut.getUsers(undefined, 'fake@gmail.com').then((data) => {
        expect(data[0].username).toBe('new_user')
    })
})

test('Testing getUsers with username and email', () => {
    return mut.getUsers('new_user', 'fake@gmail.com').then((data) => {
        expect(data[0].username).toBe('new_user')
    })
})

test('Testing findUserById with valid id', () => {
    return mut.findUserById(stud_id).then((data) => {
        //console.log(data)
        expect(data.username).toBe('new_user')
    })
})

test('deleting student user', () => {
    return mut.deleteUserById(stud_id).then((data) => {
        expect(data).toBeDefined()
    })
})

test('deleting non-student user', () => {
    return mut.deleteUserById(non_stud_id).then((data) => {
        expect(data).toBeDefined()
    })
})

beforeAll((done) => {
    done()
})

afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})
