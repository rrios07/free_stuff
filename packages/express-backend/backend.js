// backend.js
import express from 'express'
import cors from 'cors'
import funcs from './user-services.js'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import postFuncs from './post-services.js'

const app = express()
const port = 8000

dotenv.config()

const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'freestuffslo307@gmail.com',
        pass: process.env.GMAIL_PASS,
    },
}

const transporter = nodemailer.createTransport(config)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res) => {
    const username = req.query.username
    const email = req.query.email
    funcs
        .getUsers(username, email)
        .then((result) => {
            if (result.length > 0) {
                console.log(result)
                res.send(result)
            } else {
                res.status(404).send('Resource not found.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

//this may have additional future use, but is currently just for signing in
app.get('/users/:username', (req, res) => {
    const uname = req.params['username'] //or req.params.id
    const email = req.query.email
    var val = undefined
    if (email === undefined) {
        funcs
            .findUserByName(uname)
            .then((result) => {
                if (result.length > 0) {
                    console.log(result)
                    res.send(result)
                } else {
                    res.status(404).send('User not found.')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        //querying for an account at sign in
        funcs
            .findUserByNameAndEmail(uname, email)
            .then((result) => {
                if (result.length > 0) {
                    console.log(result)
                    //send randomly generated 4 digit code to email
                    val = Math.floor(1000 + Math.random() * 9000).toString()
                    const data = {
                        from: 'freestuffslo307@gmail.com',
                        to: email,
                        subject: 'Free Stuff SLO One Time Sign In Code',
                        text: val,
                    }
                    return transporter.sendMail(data)
                } else {
                    return undefined
                }
            })
            .then((result) => {
                if (result) {
                    res.status(200).send(val)
                } else {
                    res.status(404).send('User not found.')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
})

app.get('/users/:id', (req, res) => {
    const id = req.params['id'] //or req.params.id
    funcs
        .findUserById(id)
        .then((result) => {
            if (result) {
                console.log(result)
                res.send(result)
            } else {
                res.status(404).send('Resource not found.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

app.post('/users', (req, res) => {
    const userToAdd = req.body
    console.log(userToAdd)
    funcs
        .addUser(userToAdd)
        .then((user) => {
            res.status(201).send(JSON.stringify(user))
        })
        .catch((error) => {
            if (error.code == 11000) {
                res.status(409).send('email or username already exists.')
            } else {
                res.status(403).send('invalid email.')
            }
            console.log(error)
        })
})

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'] //or req.params.id
    funcs
        .deleteUserById(id)
        .then((result) => {
            if (result) {
                res.status(204).send()
            } else {
                res.status(404).send('Resource not found.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

app.get('/search', (req, res) => {
    const post_id = undefined
    console.log('search call recieved')
    postFuncs
        .getPost(post_id)
        .then((result) => {
            if (result.length > 0) {
                console.log(result)
                res.send(result)
            } else {
                res.status(404).send('Resource not found.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

app.get('/search/:query', async (req, res) => {
    try {
        const searchString = req.params.query

        // Perform the search
        const result = await findSimilarPosts(searchString)
        console.log(result.json())

        res.json({ result })
        console.log(result.json())
    } catch (error) {
        // Handle errors appropriately
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/posts', (req, res) => {
    const post_id = req.query.post_id
    postFuncs
        .getPost(post_id)
        .then((result) => {
            if (result.length > 0) {
                console.log(result)
                res.send(result)
            } else {
                res.status(404).send('Resource not found.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

app.get('/posts/:id', (req, res) => {
    const id = req.params['id'] //or req.params.id
    postFuncs
        .findPostById(id)
        .then((result) => {
            if (result) {
                console.log(result)
                res.send(result)
            } else {
                res.status(404).send('Resource not found.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

app.post('/posts', (req, res) => {
    const postToAdd = req.body
    console.log('Attempting to POST Post...')
    console.log(postToAdd)
    postFuncs
        .addPost(postToAdd)
        .then((post) => {
            res.status(201).send(JSON.stringify(post))
        })
        .catch((error) => {
            if (error.code == 11000) {
                res.status(409).send('post already exists.')
            } else {
                res.status(403).send('invalid data.')
            }
            console.log(error)
        })
    console.log('Finished attempt to POST Post...\n\n')
})

app.delete('/posts:id', (req, res) => {
    const id = req.params['id'] //or req.params.id
    postFuncs
        .deletePostById(id)
        .then((result) => {
            if (result) {
                res.status(204).send()
            } else {
                res.status(404).send('Resource not found.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

app.listen(process.env.PORT || port, () => {
    console.log('Example app listening')
})
