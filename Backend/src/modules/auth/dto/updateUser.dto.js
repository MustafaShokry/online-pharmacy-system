const Joi = require('joi');

const updateUserDto = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^0(10|11|12|15)\d{8}$/),
    age: Joi.number().min(1).max(120),
    gender: Joi.string().valid('male', 'female'),
    address: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
    }),
});

module.exports = { updateUserDto };
