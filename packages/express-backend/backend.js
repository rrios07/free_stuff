// backend.js
import express from 'express'
import cors from 'cors'
import funcs from './user-services.js'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

const app = express()
const port = 8000
//const nodemailer = require('nodemailer')

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
                    //TODO: send an email here
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
    const query = req.query.query // Get the search query from the URL
    const searchResults = ['Result 1', 'Result 2', 'Result 3'] // Replace with actual search results

    res.json({ results: searchResults })
})

app.listen(process.env.PORT || port, () => {
    console.log('Example app listening')
})
