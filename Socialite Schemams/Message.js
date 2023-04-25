const moongoose = require('mongoose');
const { Schema, model } = moongoose;

const messageSchema = new Schema({
    chatId: {
        type: moongoose.Schema.Types.ObjectId,
        required: true,
    },
    senderId: {
        type: moongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = model('Messages', messageSchema);