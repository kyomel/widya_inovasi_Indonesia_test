const jwt = require('jsonwebtoken');
const User = require('../models/').User;
require('dotenv').config();

module.exports = async (req, res, next) => {
    if(req.headers.authorization){
        try {
            let token = req.headers.authorization;
            let payload = await jwt.verify(token, process.env.SECRET_KEY);

            let user = await User.findByPk(payload.id)
            req.User = user;
            next();
        }
        catch (err) {
            res.status(401).json({
                status: 'failed',
                message: err.message
            })
        }
    } else {
        res.status(401).json({
            status: 'failed',
            message: 'You should login first!!!'
        })
    }
}