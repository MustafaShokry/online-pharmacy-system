const express = require('express');
const { 
    addProductToCart, 
    clearCart, 
    getCartForUser, 
    processCashPayment, 
    removeProductFromCart, 
    updateProductQuantityInCart 
} = require('./cart.controller.js');
const authenticate = require('../../middleware/authenticate.middleware'); // Assuming this middleware exists

const cartRouter = express.Router();

// RESTful route naming conventions with authentication middleware
cartRouter.get('/', authenticate, getCartForUser); // GET /cart
cartRouter.post('/items', authenticate, addProductToCart); // POST /cart/items
cartRouter.put('/items/:productId', authenticate, updateProductQuantityInCart); // PUT /cart/items/:productId
cartRouter.delete('/items/:productId', authenticate, removeProductFromCart); // DELETE /cart/items/:productId
cartRouter.delete('/', authenticate, clearCart); // DELETE /cart
cartRouter.post('/payment/cash', authenticate, processCashPayment); // POST /cart/payment/cash

module.exports = cartRouter;