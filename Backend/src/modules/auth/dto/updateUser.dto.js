const Joi = require('joi');

const updateUserDto = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    phone: Joi.string().pattern(/^(\+20)?1[0125][0-9]{8}$/),
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
