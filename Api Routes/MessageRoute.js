const express = require('express');
const router = express.Router();
const Chat = require('../Socialite Schemams/Chat');
const Message = require('../Socialite Schemams/Message');
const moongoose = require('mongoose');



// Send Messages


router.post('/message', async (req, res) => {
    try {

        const { text } = req.body;
        if (text) {
            const exist = await Chat.findOne({
                members: { $in: [req.user._id, req.query.id] }
            });


            // If Already Chat Exists

            if (exist) {
                const newMessage = await new Message({
                    chatId: exist._id,
                    senderId: req.user._id,
                    text: text
                });

                await newMessage.save();

                return res.status(201).json({
                    'status': 'success',
                    'message': 'message sent successfully'
                });
            }


            // If Chat Not Exists

            else {
                const chat = await new Chat({
                    members: [req.user._id, moongoose.Types.ObjectId(req.query.id)]
                });

                await chat.save();

                const findChat = await Chat.findOne({
                    members: { $in: [req.user._id, req.query.id] }
                });
                const newMessage = await new Message({
                    chatId: findChat._id,
                    senderId: req.user._id,
                    text: text
                });
                await newMessage.save();
                return res.status(201).json({
                    'status': 'success',
                    'message': 'messsage sent successfully'
                });
            };
        } else {

            return res.status(400).json({
                'status': 'Failed',
                'message': 'Please sent Something in message'
            })
        }
    } catch (err) {
        return res.status(500).json({
            'status': 'Failed',
            'message': err.message
        });
    }
});



// Get Selected User Chat


router.get('/getSelectedChat', async (req, res) => {
    try {
        const findChat = await Chat.findOne({
            members: { $in: [req.user._id, req.query.id] }
        })
        if (findChat) {
            const allMesseges = await Message.aggregate([
                { $match: { chatId: findChat._id } }
            ]);
            return res.status(200).json(allMesseges)
        } else {
            return res.status(400).json({
                'status': 'Failed',
                'message': 'Please Start a Chat First'
            })
        }
    } catch (err) {
        return res.status(500).json({
            'status': 'Failed',
            'message': err.message
        })
    };
});



// Delete Selected Chat

router.delete('/deleteSelectedChat', async (req, res) => {
    try {
        const exist = await Chat.findOne({
            members: { $in: [req.user._id, req.query.id] }
        });
        if (exist) {

            await Message.remove({ chatId: exist._id });
            await Chat.findByIdAndDelete({ _id: exist._id });

            return res.status(200).json({
                'status': 'success',
                'message': 'Chat and all messages deleted'
            })
        } else {
            return res.status(400).json({
                'status': 'Failed',
                'message': 'please start a chat first'
            });
        }
    } catch (err) {
        return res.status(500).json({
            'status': 'Failed',
            'message': err.message
        })
    }
});



// Delete Selected Messege If User Is Sender

router.delete('/deleteSelectedMessage', async (req, res) => {
    try {
        const message = await Message.findOne({ _id: req.query.id });
        if (req.user._id.equals(message.senderId)) {
            await Message.findByIdAndDelete({ _id: message._id })
            return res.status(200).json({
                'status': 'success',
                'message': 'message deleted successfully'
            });
        } else {
            return res.status(400).json({
                'status': 'Failed',
                'message': 'You Delete only Your Messages'
            })
        }
    } catch (err) {
        return res.status(500).json({
            'status': 'Failed',
            'message': err.message
        })
    }
})


module.exports = router;