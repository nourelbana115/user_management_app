const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { redisClient } = require('../config/db')

async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .send({ errors: [{ msg: 'invalid credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .send({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const payload = {
            user: user,
        };
        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json(token);
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
}

async function getUser(req, res) {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
}

async function logout(req, res) {
    try {
        const { jwtToken: token } = req;
        const client = await redisClient();

        client.lpush('expired-tokens', token, (err, data) => {
            if (err) res.status(500).send({ err })
            res.send({ msg: "user logged out" });
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'server error' });
    }
}

module.exports = {
    login,
    getUser,
    logout
}