const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');
const notFoundHandler = require('./middleware/notFound.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const productRouter = require('./modules/product/product.router');
const wishListRouter = require('./modules/wishList/wishList.routes');


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
    // Product Routes
    app.use('/products',productRouter)
    
  // Wish List Routes
    app.use('/api/wishList', wishListRouter);  

    // 404 Not Found Handler
    app.use(notFoundHandler);

    // Central Error Handler
    app.use(errorHandler);
    

    return app;
}

module.exports = { createApp };
