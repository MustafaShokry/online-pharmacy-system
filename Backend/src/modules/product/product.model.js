const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    }, 
    description: { 
        type: String,
        required: true,
        trim: true
    },
    price: { 
        type: Number,
        required: true,
        min: 0
    },
    category: { 
        type: String,
        required: true,
        trim: true
    },
    quantity: { 
        type: Number,
        required: false,
        min: 0
    },
    image: { 
        type: String, // URL or file path of the image
        trim: true,
        required: false
    },
    bestSeller: {
        type: Boolean,
        default: false,
        required: false 
    },
    offer: {
        type: Boolean,
        default: false,
        required: false
    }, 
},
{ timestamps: true }
);

const product_model = mongoose.model('product_model', productSchema);

module.exports = product_model;