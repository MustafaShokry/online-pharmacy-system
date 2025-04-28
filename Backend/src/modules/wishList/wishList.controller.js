
const service = require('./wishList.service');

const addToWishList = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const wishListItem = await service.addToWishList(userId, productId);
        res.status(201).json({ success: true, wishListItem });
    } catch (error) {
        next(error);
    }
}

const getWishList = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const wishList = await service.getWishList(userId);
        res.status(200).json({ success: true, wishList });
    } catch (error) {
        next(error);
    }
}

const removeFromWishList = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        await service.removeFromWishList(userId, productId);
        res.status(200).json({ success: true, message: "Item removed from wish list" });
    } catch (error) {
        next(error);
    }
}
const clearWishList = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await service.clearWishList(userId);
        res.status(200).json({ success: true, message: "Wish list cleared" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addToWishList,
    getWishList,
    removeFromWishList,
    clearWishList,
}

