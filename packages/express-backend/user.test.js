/*file for testing backend auxiliary functions that handle mongoose
 *API calls */
import mut from './user-services.js' // MUT = Module Under Test
import mongoose from 'mongoose'

let stud_id
let non_stud_id

test('Testing getUsers for all users', () => {
    return mut.getUsers(undefined, undefined).then((data) => {
        //console.log(data)
        expect(data).toBeDefined()
    })
})

test('Testing getUsers with username', () => {
    return mut.getUsers('murprios', undefined).then((data) => {
        expect(data[0].email).toBe('richardrios7760@gmail.com')
    })
})

test('Testing getUsers with email', () => {
    return mut.getUsers(undefined, 'richardrios7760@gmail.com').then((data) => {
        expect(data[0].username).toBe('murprios')
    })
})

test('Testing getUsers with username and email', () => {
    return mut
        .getUsers('murprios', 'richardrios7760@gmail.com')
        .then((data) => {
            expect(data[0].username).toBe('murprios')
        })
})

test('Testing findUserById with valid id', () => {
    return mut.findUserById('65650de87e4b5b90b47f35a3').then((data) => {
        console.log(data)
        expect(data.username).toBe('murprios')
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
        console.log(stud_id)
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
        console.log(non_stud_id)
        expect(data.username).toBe('non_student')
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
