const express = require("express");
const wishListController = require("./wishList.controller");
const authenticate = require("../../middleware/authenticate.middleware");

const router = express.Router();

router.post("/", authenticate ,wishListController.addToWishList);

router.get("/", authenticate, wishListController.getWishList);

router.delete("/:productId", authenticate, wishListController.removeFromWishList);

router.delete("/", authenticate, wishListController.clearWishList);

module.exports = router;
