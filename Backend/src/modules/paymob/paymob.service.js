const axios = require('axios');
const User = require('../auth/user.model.js');
const product_model = require('../product/product.model.js');
const orderModel = require('../order/order.model.js');

const authenticateWithPaymob = async () => {
    const response = await axios.post('https://accept.paymob.com/api/auth/tokens', {
        api_key: process.env.PAYMOB_API_KEY,
    });
    return response.data.token;
};

const validateUserAndItems = async (userId, items) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const availableItems = [];
    let totalPrice = 0;

    for (const item of items) {
        const product = await product_model.findById(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        if (product.quantity < item.quantity)
            throw new Error(`Insufficient quantity for product ${item.productId}`);
        totalPrice += product.price * item.quantity;
        availableItems.push({ productId: product._id, quantity: item.quantity, price: product.price });
    }

    return { user, availableItems, totalPrice };
};

const createPaymobOrder = async (token, items, amount_cents) => {
    const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', {
        auth_token: token,
        delivery_needed: 'false',
        amount_cents,
        currency: 'EGP',
        items,
    });
    return response.data.id;
};

const createPaymentKey = async (token, user, amount_cents, orderId) => {
    const billingData = {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName || 'N/A',
        phone_number: user.phone || 'N/A',
        street: user.address?.street || 'N/A',
        building: user.address?.building || 'N/A',
        floor: user.address?.floor || 'N/A',
        apartment: user.address?.apartment || 'N/A',
        city: user.address?.city || 'N/A',
        country: user.address?.country || 'N/A',
        state: user.address?.state || 'N/A',
    };

    const response = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
        auth_token: token,
        amount_cents,
        expiration: 3600,
        order_id: orderId,
        billing_data: billingData,
        currency: 'EGP',
        integration_id: process.env.PAYMOB_INTEGRATION_ID,
    });

    return response.data.token;
};

const saveOrder = async (user, availableItems, totalPrice, paymentMethod, paymentToken, paymobOrderId) => {
    const newOrder = new orderModel({
        userId: user._id,
        items: availableItems,
        totalPrice,
        paymentMethod,
        status: 'pending',
        paymentToken,
        paymobOrderId,
    });
    return await newOrder.save();
};

const updateOrderStatusById = async (orderId, status) => {
    const order = await orderModel.findById(orderId);
    if (!order) throw new Error('Order not found');
    order.status = status;
    return await order.save();
};

const updateOrderStatusByPaymobId = async (paymobOrderId, success) => {
    const order = await orderModel.findOne({ paymobOrderId });
    if (!order) throw new Error('Order not found');
    order.status = success ? 'completed' : 'failed';
    return await order.save();
};

module.exports = {
    authenticateWithPaymob,
    validateUserAndItems,
    createPaymobOrder,
    createPaymentKey,
    saveOrder,
    updateOrderStatusById,
    updateOrderStatusByPaymobId
};
