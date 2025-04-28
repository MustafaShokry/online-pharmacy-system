const authService = require('./auth.service');

exports.register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ success: true, message: 'User registered successfully', user });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        await authService.forgotPassword(req.body.email);
        res.status(200).json({ message: 'Reset link sent if email exists' });
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        await authService.resetPassword(req.params.token, req.body.password);
        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
        next(err);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        await authService.changePassword(req.user.id, req.body);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        next(err);
    }
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await authService.getUserById(req.user.id);
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

exports.updateUserProfile = async (req, res, next) => {
    try {
        const updatedUser = await authService.updateUserById(req.user.id, req.body);
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        next(err);
    }
};

