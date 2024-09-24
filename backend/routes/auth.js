const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const AuthController = require('../controllers/authController')

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify/:token', AuthController.verify);
router.post('/resend', AuthController.resend);
router.post('/forgot', AuthController.forgotPassword);

module.exports = router;