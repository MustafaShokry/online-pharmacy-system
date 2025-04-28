const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { getUserById } = require('../modules/auth/auth.service');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new AppError('No token provided', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await getUserById(userId);
        req.user = { id: user._id, role: user.role };
        next();
    } catch (error) {
        next(new AppError('Invalid or expired token', 401));
    }
};

module.exports = authenticate;
