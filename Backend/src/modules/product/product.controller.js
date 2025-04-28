const Product = require('./product.model');
const fs = require('fs');
const path = require('path');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
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
        next(error);
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { _id } = req.body;
        const updates = req.body;

        if (req.file) {
            updates.image = req.file.path; // Update image if a new one is uploaded
        }

        const updatedProduct = await Product.findByIdAndUpdate(_id, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { _id } = req.body;        
        const product = await Product.findByIdAndDelete(_id);

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
        next(error);
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
        next(error);
    }
};
