const moongoose = require('mongoose');
const { Schema, model } = moongoose;

const commentSchema = new Schema({
    postId: {
        type: moongoose.Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = model('Comments', commentSchema);