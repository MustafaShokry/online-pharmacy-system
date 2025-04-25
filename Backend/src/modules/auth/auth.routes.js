const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../middleware/validate.middleware');
const { createUserDto } = require('./dto/register.dto');
const { loginUserDto } = require('./dto/login.dto');


router.post('/register', validate(createUserDto), authController.register);


router.post('/login', validate(loginUserDto), authController.login);


module.exports = router;
