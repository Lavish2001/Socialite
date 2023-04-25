const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../Socialite Schemams/Post');

router.post('/post', async (req, res) => {
    try {
        console.log(req.body)
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        });
    }
});


module.exports = router;