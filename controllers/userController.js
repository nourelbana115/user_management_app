const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {  validationResult } = require('express-validator');
const User = require('../models/User');



async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .send({ errors: [{ msg: 'user already exists' }] });
        }
  
        const newUser = new User({
            name,
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        const payload = {
            user: newUser,
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
        res.status(500).send('server error');
    }
}
module.exports = { register }