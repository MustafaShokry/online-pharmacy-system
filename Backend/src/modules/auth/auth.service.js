const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./user.model');
const AppError = require('../../utils/AppError');
const sendEmail = require('../../utils/sendEmail');


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
        expiresIn: process.env.JWT_EXPIRATION,
    });


    return token;
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) return;

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `Click here to reset your password: ${resetUrl}`;
    await sendEmail(user.email, 'Reset Your Password', message);
};

const resetPassword = async (token, newPassword) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) throw new AppError('Token is invalid or expired', 400);

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
    const user = await User.findById(userId).select('+password');
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
        throw new AppError('Current password is incorrect', 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    await user.save();
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
};
