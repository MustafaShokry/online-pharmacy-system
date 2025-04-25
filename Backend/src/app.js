const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');
const notFoundHandler = require('./middleware/notFound.middleware');
const authRoutes = require('./modules/auth/auth.routes');


function createApp() {
    const app = express();

    // Global Middlewares
    app.use(cors());
    app.use(express.json());

    // Basic Test Route
    app.get('/', (req, res) => {
        res.send("Hello World!");
    })

    // Mount routes
    app.use('/api/auth', authRoutes);

    // 404 Not Found Handler
    app.use(notFoundHandler);

    // Central Error Handler
    app.use(errorHandler);

    return app;
}

module.exports = { createApp };
