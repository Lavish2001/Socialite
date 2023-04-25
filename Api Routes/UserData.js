const express = require('express');
const router = express.Router();
const User = require('../Socialite Schemams/User');
const mongoose = require('mongoose');



// BLOCK USER

router.patch('/block', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (user.blockList.includes(req.query.id)) {
            res.status(400).json({
                'status': 'Failed',
                'message': 'You already blocked this user'
            });
        } else {
            await user.updateOne({ $push: { blockList: mongoose.Types.ObjectId(req.query.id) } });
            res.status(200).json({
                'status': 'success',
                'message': 'User Blocked'
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        });
    };
});




// UNBLOCK USER

router.patch('/unblock', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (user.blockList.includes(req.query.id)) {
            await user.updateOne({ $pull: { blockList: mongoose.Types.ObjectId(req.query.id) } });
            res.status(200).json({
                'status': 'success',
                'message': 'User unBlocked'
            });
        } else {
            res.status(400).json({
                'status': 'Failed',
                'message': 'You already unblocked this user'
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        });
    };
});



// GET USER FRIENDS

router.get('/friends', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        const userFriends = await Promise.all(
            user.friends.map((item) => {
                return User.findById(item)
            })
        );
        res.status(200).json(userFriends)
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        });
    }
});




// GET ALL USERS

router.get('/data', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        const allUsers = await User.find({
            '$or': [
                { 'userName': { '$regex': req.query.name, $options: 'i' }, '$nor': [{ _id: [user._id, ...user.blockList] }] }
            ]
        }).select('-password');
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        });
    }
});



// UPDATE USER PROFILE 

router.patch('/setProfile', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        await user.updateOne({
            $set: req.body
        });
        res.status(200).json({
            'status': 'success',
            'message': 'Profile Data Updated'
        })
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        })
    }
})

module.exports = router;