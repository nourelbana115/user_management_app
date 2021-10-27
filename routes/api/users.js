const expres = require('express');
const router = expres.Router();
const { check } = require('express-validator');
const { register } = require('../../controllers/userController')
const { authenticate, grantAccess } = require('../../middleware/auth')

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please, enter a valid Email').isEmail(),
    check('password', 'please enter a valid password').isLength({ min: 6 }),
  ],
  register
);
router.get('/usermanagement', authenticate, grantAccess('updateAny', 'profile'), (req, res) => {
  res.send({msg:"hello authorized user ... "})
})

module.exports = router;
