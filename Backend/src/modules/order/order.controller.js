const orderModel = require('./order.model');
const productModel = require('../product/product.model'); // Assuming product model exists
const AppError = require('../../utils/AppError'); // Assuming AppError exists
const mongoose = require('mongoose');

const getOrders = async (req, res, next) => {
    const { userId } = req.query;

    try {
        const query = userId ? { userId } : {};
        const orders = await orderModel.find(query).populate('userId', 'userName email');

        res.status(200).json({
            success: true,
            message: userId ? `Orders for user: ${userId}` : 'All orders retrieved successfully',
            data: orders,
        });
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
};

const getOrderDetails = async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const order = await orderModel.findById(orderId).populate('userId', 'userName email');

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        res.status(200).json({
            success: true,
            message: `Order details for order ID: ${orderId}`,
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.find();
        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        next(error);
    }
};

const updateOrderStatus = async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        if (!['pending', 'completed', 'canceled', 'failed'].includes(status)) {
            throw new AppError('Invalid status', 400);
        }

        const order = await orderModel.findById(orderId);
        if (!order) {
            throw new AppError('Order not found', 404);
        }

        if (status === 'completed') {
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
                const productChecks = await Promise.all(order.items.map(item =>
                    productModel.findById(item.productId).session(session)
                ));

                const isAvailable = productChecks.every((product, index) => 
                    product && product.quantity >= order.items[index].quantity
                );

                if (!isAvailable) {
                    await session.abortTransaction();
                    throw new AppError('Order canceled due to insufficient product quantity.', 400);
                }

                await Promise.all(order.items.map(async (item) => {
                    const product = await productModel.findById(item.productId).session(session);
                    if (product) {
                        product.quantity -= item.quantity;
                        await product.save({ session });
                    }
                }));

                await session.commitTransaction();
            } catch (error) {
                await session.abortTransaction();
                throw error;
            } finally {
                session.endSession();
            }
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrders,
    getOrderDetails,
    getAllOrders,
    updateOrderStatus,
};