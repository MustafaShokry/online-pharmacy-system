const AppError = require('../utils/AppError');

const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property] || {}, { abortEarly: false });

        if (error) {
            const messages = error.details.map(detail => detail.message.replace(/["]/g, '\''));
            return next(new AppError(messages.join(', '), 400));
        }

        next();
    };
};

module.exports = validate;
