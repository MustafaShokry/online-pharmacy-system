const Joi = require('joi');

const loginUserDto = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    loginUserDto
};