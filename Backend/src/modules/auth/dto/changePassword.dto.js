const Joi = require('joi');


const changePasswordDto = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Passwords do not match'
    })
});

module.exports = {
    changePasswordDto,
};