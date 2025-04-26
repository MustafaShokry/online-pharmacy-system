const Joi = require('joi');

const forgotPasswordDto = Joi.object({
    email: Joi.string().email().required()
});


module.exports = {
    forgotPasswordDto,
};