const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');
const notFoundHandler = require('./middleware/notFound.middleware')
const productRouter = require('./modules/product/product_router');

function createApp() {
    const app = express();

    // Global Middlewares
    app.use(cors());
    app.use(express.json());

    // Basic Test Route
    app.get('/', (req, res) => {
        res.send("Hello World!");
    })

    // Product Routes
    app.use('/products',productRouter)


    // 404 Not Found Handler
    app.use(notFoundHandler);

    // Central Error Handler
    app.use(errorHandler);
    

    return app;
}

module.exports = { createApp };
