const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Updated to match `cart.model.js`
        required: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Updated to match `cart.model.js`
            quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] } // Added validation
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: [0, 'Total price must be a non-negative value'] // Added validation
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'Credit Card', 'paypal'], // Updated to match supported payment methods
        default: 'cash'
    },
    paymobOrderId: { type: String, default: null }, // Added default value
    paymentToken: { type: String, default: null }, // Added default value
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled', 'failed'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);