const {
    authenticateWithPaymob,
    validateUserAndItems,
    createPaymobOrder,
    createPaymentKey,
    saveOrder,
    updateOrderStatusById,
    updateOrderStatusByPaymobId
} = require('./paymob.service.js');

const authenticatePaymob = async (req, res) => {
    try {
        const token = await authenticateWithPaymob();
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const createPayment = async (req, res) => {
    const { userId, items, paymentMethod } = req.body;
    const shippingFee = 40;

    try {
        const { user, availableItems, totalPrice } = await validateUserAndItems(userId, items);
        const finalPrice = totalPrice + shippingFee;

        const token = await authenticateWithPaymob();

        const paymobItems = [
            ...availableItems.map(item => ({
                name: item.productId.toString(),
                quantity: item.quantity,
                amount_cents: item.price * 100,
            })),
            {
                name: 'Shipping Fee',
                quantity: 1,
                amount_cents: shippingFee * 100,
            }
        ];

        const amountCents = paymobItems.reduce((sum, item) => sum + item.amount_cents * item.quantity, 0);

        const paymobOrderId = await createPaymobOrder(token, paymobItems, amountCents);
        const paymentToken = await createPaymentKey(token, user, amountCents, paymobOrderId);

        const order = await saveOrder(user, availableItems, finalPrice, paymentMethod, paymentToken, paymobOrderId);

        res.status(200).json({
            success: true,
            message: 'Payment initiated successfully.',
            paymentToken,
            orderId: order._id,
            paymobOrderId,
            totalPrice: finalPrice,
        });
    } catch (error) {
        console.error('Create payment error:', error);
        res.status(500).json({ error: error.message });
    }
};

const completePayment = async (req, res) => {
    const { orderId } = req.body;
    try {
        await updateOrderStatusById(orderId, 'completed');
        res.status(200).json({ success: true, message: 'Payment completed successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const handlePaymobWebhook = async (req, res) => {
    const data = req.body;
    try {
        await updateOrderStatusByPaymobId(data.order, data.success === true);
        res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    authenticatePaymob,
    createPayment,
    completePayment,
    handlePaymobWebhook
};
