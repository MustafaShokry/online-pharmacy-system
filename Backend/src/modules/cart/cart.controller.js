const cartModel = require('./cart.model');
const orderModel = require('../order/order.model');
const Product = require('../product/product_model');
const User = require('../auth/user.model');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const AppError = require('../../utils/AppError');

// Ensure required environment variables are present
if (!process.env.JWT_SECRET || !process.env.PAYMOB_API_KEY || !process.env.INTEGRATION_ID || !process.env.IFRAME_ID) {
    throw new Error('Missing required environment variables');
}

const extractUserIdFromToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Authorization token missing or invalid', 401);
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
};

const catchError = (fn) => (req, res, next) => {
    return fn(req, res, next).catch((error) => {
        console.error('Error in cart controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};

// Helper function to recalculate cart totals
const recalculateCartTotals = (cart) => {
    cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

module.exports.addProductToCart = catchError(async (req, res) => {
    const userId = extractUserIdFromToken(req);
    const { productId } = req.body;

    if (!productId) {
        throw new AppError("Product ID is required", 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError("Product not found", 404);
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
        cart = new cartModel({
            userId,
            items: [{ productId, quantity: 1, price: product.price }],
        });
        recalculateCartTotals(cart);
        await cart.save();
        return res.json({ msg: "Product added to cart", result: cart });
    }

    const item = cart.items.find((item) => item.productId.toString() === productId.toString());

    if (item) {
        item.quantity += 1;
        item.price = product.price;
    } else {
        cart.items.push({ productId, quantity: 1, price: product.price });
    }

    recalculateCartTotals(cart);
    await cart.save();
    res.json({ msg: "Product added/updated in cart", cart });
});

module.exports.updateProductQuantityInCart = catchError(async (req, res) => {
    const userId = extractUserIdFromToken(req);
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
        throw new AppError("Product ID and valid quantity are required", 400);
    }

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const item = cart.items.find((item) => item.productId.toString() === productId.toString());
    if (!item) {
        throw new AppError("Product not found in cart", 404);
    }

    item.quantity = quantity;
    recalculateCartTotals(cart);
    await cart.save();
    res.json({ msg: "Product quantity updated", cart });
});

module.exports.removeProductFromCart = catchError(async (req, res) => {
    const userId = extractUserIdFromToken(req);
    const { productId } = req.params;

    if (!productId) {
        throw new AppError("Product ID is required", 400);
    }

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId.toString());
    if (itemIndex === -1) {
        throw new AppError("Product not found in cart", 404);
    }

    cart.items.splice(itemIndex, 1);
    recalculateCartTotals(cart);
    await cart.save();

    res.json({ msg: "Product removed from cart", cart });
});

module.exports.getCartForUser = catchError(async (req, res) => {
    const userId = extractUserIdFromToken(req);
    const cart = await cartModel.findOne({ userId }).populate({
        path: 'items.productId',
        model: Product,
    });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    if (cart.totalPrice === 0) {
        return res.json({ msg: "Cart is empty", cart });
    }

    return res.json({ msg: "Cart retrieved successfully", cart });
});

module.exports.clearCart = catchError(async (req, res) => {
    const userId = extractUserIdFromToken(req);
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
        throw new AppError("Cart not found for this user", 404);
    }

    cart.items = [];
    recalculateCartTotals(cart);
    await cart.save();

    res.json({ msg: "Cart cleared successfully", cart });
});

module.exports.processCashPayment = catchError(async (req, res) => {
    const { userId, items } = req.body;

    if (!userId || !items) {
        throw new AppError('Missing required fields: userId and items are required.', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found.', 404);
    }

    let totalPrice = 0;
    const availableItems = [];

    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            throw new AppError(`Product ID "${item.productId}" not found.`, 404);
        }
        if (product.quantity < item.quantity) {
            throw new AppError(`Insufficient quantity for product ID "${item.productId}".`, 400);
        }

        totalPrice += product.price * item.quantity;
        availableItems.push({
            productId: product._id,
            quantity: item.quantity,
            price: product.price,
        });
    }

    const newOrder = new orderModel({
        userId: user._id,
        items: availableItems,
        totalPrice,
        paymentMethod: 'cash',
        status: 'pending',
    });

    await newOrder.save();

    const cart = await cartModel.findOne({ userId });
    if (cart) {
        cart.items = [];
        recalculateCartTotals(cart);
        await cart.save();
    }

    res.status(200).json({
        success: true,
        message: 'Cash payment processed successfully.',
        orderId: newOrder._id,
        totalPrice,
        paymentMethod: 'Cash',
        items: availableItems,
        user: { userId: user._id, email: user.email, firstName: user.userName },
    });
});

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const INTEGRATION_ID = process.env.INTEGRATION_ID;
const IFRAME_ID = process.env.IFRAME_ID;

module.exports.processVisaPayment = catchError(async (req, res) => {
    const { amount, currency } = req.body;

    const authResponse = await axios.post('https://accept.paymob.com/api/auth/tokens', {
        api_key: PAYMOB_API_KEY,
    });
    const token = authResponse.data.token;

    const orderResponse = await axios.post('https://accept.paymob.com/api/ecommerce/orders', {
        auth_token: token,
        delivery_needed: false,
        amount_cents: amount,
        currency,
        items: [],
    });
    const orderId = orderResponse.data.id;

    const paymentKeyResponse = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
        auth_token: token,
        amount_cents: amount,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
            apartment: req.body.apartment || "NA",
            email: req.body.email || "user@example.com",
            floor: req.body.floor || "NA",
            first_name: req.body.firstName || "John",
            last_name: req.body.lastName || "Doe",
            phone_number: req.body.phoneNumber || "+201000000000",
            city: req.body.city || "Cairo",
            country: req.body.country || "EG",
            street: req.body.street || "NA",
            postal_code: req.body.postalCode || "NA",
        },
        currency,
        integration_id: INTEGRATION_ID,
    });
    const paymentToken = paymentKeyResponse.data.token;

    const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentToken}`;

    res.json({ msg: 'Payment initiated, please complete in the iframe', paymentUrl });
});