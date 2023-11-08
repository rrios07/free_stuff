import mongoose from 'mongoose'

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

const StudUserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            validate: [validateEmail, 'email address must be valid'],
            unique: true,
        },
        student: {
            type: Boolean,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        zip: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    { collection: 'users_list' }
)

const User = mongoose.model('User', StudUserSchema)

export default User
