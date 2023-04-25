const moongoose = require('mongoose');
const { Schema, model } = moongoose;

const postSchema = new Schema({
    ownerId: {
        type: moongoose.Schema.Types.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ""
    },
    likes: [
        {
            type: moongoose.Schema.Types.ObjectId,
        }
    ]
},
    { timestamps: true });

module.exports = model('Posts', postSchema);