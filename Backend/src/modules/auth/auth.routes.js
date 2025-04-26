const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../middleware/validate.middleware');
const authenticate = require('../../middleware/authenticate.middleware');
const { createUserDto } = require('./dto/register.dto');
const { loginUserDto } = require('./dto/login.dto');
const { forgotPasswordDto } = require('./dto/forgotPassword.dto');
const { resetPasswordDto } = require('./dto/resetPassword.dto');
const { changePasswordDto } = require('./dto/changePassword.dto');


router.post('/register', validate(createUserDto), authController.register);


router.post('/login', validate(loginUserDto), authController.login);


router.post('/forgot-password', validate(forgotPasswordDto), authController.forgotPassword);


router.post('/reset-password/:token', validate(resetPasswordDto), authController.resetPassword);


router.patch('/change-password', authenticate, validate(changePasswordDto), authController.changePassword);



module.exports = router;
