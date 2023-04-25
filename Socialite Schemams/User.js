const moongoose = require('mongoose');
const { Schema, model } = moongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, 'Username Required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email Required']
    },
    password: {
        type: String,
        required: [true, 'Email Required'],
        minLength: 8
    },
    description: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    school: {
        type: String,
        default: ""
    },
    college: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    friendRequests: {
        type: Array,
        default: []
    },
    blockList: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

module.exports = model('Users', userSchema);