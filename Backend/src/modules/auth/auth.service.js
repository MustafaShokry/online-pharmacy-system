const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user.model');
const AppError = require('../../utils/AppError');

const register = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError('Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await User.create({
        ...userData,
        password: hashedPassword,
    });

    if (!user) {
        throw new AppError('User registration failed', 500);
    }

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.__v;

    return userObj;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });


    return token;
};

module.exports = {
    register,
    login,
};
