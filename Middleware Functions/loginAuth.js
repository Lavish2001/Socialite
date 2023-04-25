const jwt = require('jsonwebtoken');
const User = require('../Socialite Schemams/User');

const loginAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];

            // Verify Token
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // Get User From Token
            req.user = await User.findById(userId);
            next();

        } catch (err) {
            res.status(400).json({
                'status': 'Failed',
                'message': 'unauthorized user no token'
            });
        }
    }
    if (!token) {
        res.status(400).json({
            'status': 'Failed',
            'message': 'unauthorized user no token'
        })
    }

};

module.exports = loginAuth;