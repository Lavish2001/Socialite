const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Socialite Schemams/User');


// Login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                res.status(200).json({
                    'status': 'success',
                    'message': 'user logged in successfully',
                    'token': token
                });
            } else {
                res.status(400).json({
                    'status': 'failed',
                    'message': 'Wrong Password'
                });
            }
        } else {
            res.status(400).json({
                'status': 'Failed',
                'message': 'Email not exists'
            })
        }
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        });
    }
});


module.exports = router;