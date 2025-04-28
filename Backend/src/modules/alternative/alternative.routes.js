const express = require("express");
const alternativeController = require("./alternative.controller");
const authenticate = require("../../middleware/authenticate.middleware");
const authorize = require('../../middleware/authorize.middleware'); // Import the authorization middleware

const router = express.Router();

router.use(authenticate, authorize('admin')); // Apply authentication and authorization middleware to all routes

router.post("/", alternativeController.addAlternative);

router.delete("/:productId/:alternativeProductId", alternativeController.deleteAlternative);

module.exports = router;

