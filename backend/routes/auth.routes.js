const {Router} = require('express');
const { validateSignup, validateSignin } = require('../middlewares/auth.middleware');
const { signIn, signUp } = require('../controllers/auth.controller');

const router = Router();

router.post('/signup',validateSignup,signUp);
router.post('/signin',validateSignin,signIn);

module.exports = router;