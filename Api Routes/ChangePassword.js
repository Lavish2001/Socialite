const express = require('express');
const User = require('../Socialite Schemams/User');
const router = express.Router();
const bcrypt = require('bcrypt');

router.patch('/changePassword', async (req, res) => {
    try {
        const { currentPassword, changedPassword } = req.body;
        const validPassword = await bcrypt.compare(currentPassword, req.user.password);
        if (validPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(changedPassword, salt);
            const user = await User.findOne({ email: req.user.email });
            await user.updateOne({ $set: { password: hashPassword } });
            res.status(200).json({
                'status': 'success',
                'message': 'Password changed successfully'
            });
            return;
        }
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        });
    };
});

module.exports = router;