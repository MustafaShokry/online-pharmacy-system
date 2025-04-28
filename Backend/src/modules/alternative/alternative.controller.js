const service = require("./alternative.service");

const addAlternative = async (req, res, next) => {
    try {
        const { productId, alternativeProductId } = req.body;

        if (!productId || !alternativeProductId) {
            return res.status(400).json({ message: "Product ID and Alternative Product ID are required" });
        }

        const alternative = await service.addAlternative(productId, alternativeProductId);
        res.status(201).json({ success: true, alternative });
    } catch (error) {
        next(error);
    }
}
const deleteAlternative = async (req, res, next) => {
    try {
        const { productId, alternativeProductId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        await service.deleteAlternative(productId, alternativeProductId);
        res.status(200).json({ success: true, message: "Alternative deleted successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addAlternative,
    deleteAlternative,
}
