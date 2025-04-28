const express = require('express');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');
const notFoundHandler = require('./middleware/notFound.middleware');
const authRoutes = require('./modules/auth/auth.routes');
const productRouter = require('./modules/product/product.router');
const wishListRouter = require('./modules/wishList/wishList.routes');
const OrderRouter = require('./modules/order/order.routes');
const CartRouter = require('./modules/cart/cart.routes');
const productSeeder = require('./modules/product/product.seed');


function createApp() {

    // productSeeder();

    const app = express();

    // Global Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/images', express.static(path.join(__dirname, '..', 'images')));

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
    // Order Routes
    app.use('/orders',OrderRouter)
    // Cart Routes
    app.use('/cart',CartRouter)

    // 404 Not Found Handler
    app.use(notFoundHandler);

    // Central Error Handler
    app.use(errorHandler);
    

    return app;
}

module.exports = { createApp };
