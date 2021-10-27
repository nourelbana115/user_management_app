const expres = require('express');

const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const router = expres.Router();
const { login, getUser,logout } = require('../../controllers/authController')
const { authenticate, grantAccess } = require('../../middleware/auth')
//get user
//router.get('/', auth, getUser);

// User login

router.post(
  '/',
  [
    check('email', 'please, enter a valid Email').isEmail(),
    check('password', 'please enter a valid password').exists(),
  ],
  login
);
router.post('/logout',authenticate,logout)
module.exports = router;
