const Joi = require('joi');

const createUserDto = Joi.object({
    firstName: Joi.string().trim().min(2).max(30).required(),
    lastName: Joi.string().trim().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    }),
    phone: Joi.string().trim().pattern(/^\+20(10|11|12|15)\d{8}$/).required(),
    age: Joi.number().integer().min(1).max(120).required(),
    gender: Joi.string().valid('male', 'female').required(),
    address: Joi.object({
        street: Joi.string().trim().required(),
        city: Joi.string().trim().required(),
        state: Joi.string().trim().required(),
        country: Joi.string().trim().required(),
        zipCode: Joi.string().trim().pattern(/^\d{5}$/).required()
    }).required(),
    wishlist: Joi.array().items(Joi.string().hex().length(24)) // MongoDB ObjectIds
});

module.exports = {
    createUserDto
};