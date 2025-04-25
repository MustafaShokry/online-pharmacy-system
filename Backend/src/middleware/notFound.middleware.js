const AppError = require('../utils/AppError');

const notFoundHandler = (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
};

module.exports = notFoundHandler;
