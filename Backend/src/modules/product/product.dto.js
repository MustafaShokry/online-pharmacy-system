const Joi = require('joi');

const addProductDto = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    bestSeller: Joi.boolean().optional(),
    offer: Joi.boolean().optional(),
});

const updateProductDto = Joi.object({
    _id: Joi.string().required(), // MongoDB ObjectId
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    category: Joi.string().optional(),
    quantity: Joi.number().min(0).optional(),
    bestSeller: Joi.boolean().optional(),
    offer: Joi.boolean().optional(),
});

module.exports = {
    addProductDto,
    updateProductDto,
};