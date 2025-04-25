const express = require('express');
const productController = require('./product_controller'); // Import the controller

const router = express.Router();

router.get('/getAllProducts', productController.getAllProducts);
router.post('/addProduct', productController.addProduct);
router.put('/updateProduct', productController.updateProduct);
router.delete('/deleteProduct', productController.deleteProduct);
productRouter.use('/category', getProductCountByCategory); 

module.exports = router;
