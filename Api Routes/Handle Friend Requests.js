const express = require('express');
const router = express.Router();
const User = require('../Socialite Schemams/User');
const moongoose = require('mongoose');



// SEND FRIEND REQUESTS

router.post('/sentRequest', async (req, res) => {
    try {
        if (req.user._id.equals(moongoose.Types.ObjectId(req.query.id))) {
            res.status(400).json({
                'status': 'Failed',
                'message': "You can't request yourself "
            });
            return;
        }
        const requestTo = await User.findOne({ _id: req.query.id });
        if (requestTo.friendRequests.includes(req.user._id)) {
            res.status(400).json({
                'status': 'Failed',
                'message': 'Already Friend Request Sent'
            })
        } else {
            await requestTo.updateOne({ $push: { friendRequests: req.user._id } });
            res.status(200).json({
                'status': 'success',
                'message': 'Friend Request Sent'
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'messgae': 'Friend Request Sent'
        });
    }
});





// CANCEL FRIEND REQUEST

router.patch('/cancelRequest', async (req, res) => {
    try {
        const cancelTo = await User.findOne({ _id: req.query.id });
        if (cancelTo.friendRequests.includes(req.user._id)) {
            await cancelTo.updateOne({ $pull: { friendRequests: req.user._id } });
            res.status(200).json({
                'status': 'success',
                'message': 'Friend Request cancelled'
            })
        } else {
            res.status(400).json({
                'status': 'Failed',
                'message': "You haven't sent Friend Request this user before"
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'messgae': err.message
        })
    }
});




// ACCEPT FRIEND REQUEST

router.patch('/acceptRequest', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (user.friendRequests.includes(req.query.id)) {
            await user.updateOne({ $push: { friends: moongoose.Types.ObjectId(req.query.id) } });
            await user.updateOne({ $pull: { friendRequests: moongoose.Types.ObjectId(req.query.id) } });
            res.status(200).json({
                'status': 'success',
                'message': 'Friend Request Accepted'
            });
        } else {
            res.status(400).json({
                'status': 'Failed',
                'message': 'This user is not in your Friend Requests'
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        })
    }
});




// UNFRIEND USER

router.patch('/unfriend', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (user.friends.includes(req.query.id)) {
            await user.updateOne({ $pull: { friends: moongoose.Types.ObjectId(req.query.id) } });
            res.status(200).json({
                'status': 'success',
                'message': 'Unfriend successfully'
            })
        } else {
            res.status(400).json({
                'status': 'Failed',
                'message': 'This user is not in your friend list'
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        })
    }
})


module.exports = router;