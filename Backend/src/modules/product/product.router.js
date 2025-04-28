const express = require('express');
const multer = require('multer');
const productController = require('./product.controller'); // Import the controller
const { addProductDto, updateProductDto } = require('./product.dto');
const validate = require('../../middleware/validate.middleware'); // Import the validation middleware
const authenticate = require('../../middleware/authenticate.middleware'); // Import the authentication middleware
const authorize = require('../../middleware/authorize.middleware'); // Import the authorization middleware



const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Routes
router.get('/getAllProducts', authenticate, productController.getAllProducts);
router.post('/addProduct', authenticate, authorize('admin'), upload.single('image'), validate(addProductDto), productController.addProduct); // Handle image upload
router.put('/updateProduct', authenticate, authorize('admin'), upload.single('image'), validate(updateProductDto), productController.updateProduct); // Handle image upload
router.delete('/deleteProduct', authenticate, authorize('admin'), productController.deleteProduct);
router.use('/category', authenticate, productController.getProductsByCategory);

module.exports = router;
