const express = require('express');
const multer = require('multer');
const productController = require('./product_controller'); // Import the controller

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
router.get('/getAllProducts', productController.getAllProducts);
router.post('/addProduct', upload.single('image'), productController.addProduct); // Handle image upload
router.put('/updateProduct', upload.single('image'), productController.updateProduct); // Handle image upload
router.delete('/deleteProduct', productController.deleteProduct);
router.use('/category', productController.getProductsByCategory);

module.exports = router;
