const moongoose = require('mongoose');
const { Schema, model } = moongoose;

const chatSchema = new Schema({
    members: {
        type: Array,
        required: true
    },
    userId: {
        type: moongoose.Types.ObjectId,
        require: true
    }
},
    { timestamps: true });

module.exports = model('Chats', chatSchema);