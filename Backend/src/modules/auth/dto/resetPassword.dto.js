const Joi = require('joi');


const resetPasswordDto = Joi.object({
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    })
});

module.exports = {
    resetPasswordDto,
};