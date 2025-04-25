const Product = require('./product_model');
const fs = require('fs');
const path = require('path');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, bestSeller, offer } = req.body;
        const image = req.file ? req.file.path : null; // Image uploaded via multer

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            quantity,
            bestSeller: bestSeller || false,
            offer: offer || false,
            image
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const updates = req.body;

        if (req.file) {
            updates.image = req.file.path; // Update image if a new one is uploaded
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;        
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the image file if it exists
        if (product.image) {
            const imagePath = path.resolve(product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

// Get product count by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) {
            return res.status(400).json({ success: false, message: 'Category is Miss.' });
        }
        const products = await Product.find({ category });
        const productCount = products.length;
        res.status(200).json({ 
            success: true,
            productCount,
            products: products.map(product => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                bestSeller: product.bestSeller,
                offer: product.offer,
                description: product.description,
                image: product.image,
                productId:product._id
            }))
         });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error });
    }
};
