const express = require('express');
const User = require('../Socialite Schemams/User');
const router = express.Router();
const bcrypt = require('bcrypt');
// const connection = require('../config');
// const mysql = require('mysql');
// const User = require('../Socialite Schemams/UserMysqlSchema');
// const sequelize = require('../config');



// Registration

router.post('/registration', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (userName && email && password) {
            const exist = await User.findOne({ email: req.body.email });
            if (exist) {
                res.status(400).json({
                    'status': 'Failed',
                    'message': 'Email already exists'
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const user = await new User({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hashedPassword
                });
                await user.save();
                res.status(200).json({
                    'status': 'success',
                    'message': 'User Registration Successful'
                });
            };
        } else {
            res.status(400).json({
                'status': 'Failed',
                'message': 'require all fields'
            })
        }
    } catch (err) {
        res.status(500).json({
            'status': 'failed', 'message': err.message
        });
    }

});



// router.post('/registration', async (req, res) => {
//     try {
//         const { userName, email, password } = req.body;
//         if (userName && email && password) {

//             const salt = await bcrypt.genSalt(10);
//             const hashPassword = await bcrypt.hash(password, salt);
//             await User.create({
//                 userName: userName,
//                 email: email,
//                 password: hashPassword
//             }).then((user) => {
//                 if (user) {
//                     return res.status(200).json({
//                         'status': 'success',
//                         'message': 'user data created'
//                     })
//                 } else {
//                     res.status(400).json({
//                         'status': 'Failed',
//                         'message': 'error'
//                     })
//                 }
//             })
//         } else {
//             res.status(400).json({
//                 'status': 'Failed',
//                 'message': 'Please fill all require fields'
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             'status': 'Failed',
//             'message': err.message
//         })
//     }

// });

module.exports = router;