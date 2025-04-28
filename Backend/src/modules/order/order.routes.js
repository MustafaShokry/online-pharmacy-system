const express = require('express');
const { getOrders, getOrderDetails, updateOrderStatus, getAllOrders } = require('./order.controller.js');
const authenticate = require('../../middleware/authenticate.middleware'); // Assuming this middleware exists
const authorize = require('../../middleware/authorize.middleware'); // Assuming this middleware exists
const { param } = require('express-validator');

const orderRouter = express.Router();

// RESTful route naming conventions with authentication and authorization middleware

// GET /orders - Get all orders for the current user
orderRouter.get('/', authenticate, getOrders);

// GET /orders/all - Get all orders (admin functionality)
orderRouter.get('/all', authenticate, authorize('admin'), getAllOrders);

// GET /orders/:orderId - Get details of a specific order
orderRouter.get('/:orderId', authenticate, param('orderId').isMongoId().withMessage('Invalid order ID'), getOrderDetails);

// PUT /orders/:orderId/status - Update the status of an order
orderRouter.put('/:orderId/status', authenticate, authorize('admin'), param('orderId').isMongoId().withMessage('Invalid order ID'), updateOrderStatus);

module.exports = orderRouter;
