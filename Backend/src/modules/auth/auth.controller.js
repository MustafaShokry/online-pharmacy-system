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

