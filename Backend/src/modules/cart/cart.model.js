const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        items: [
            {
                productId: { 
                    type: mongoose.Types.ObjectId, 
                    ref: 'Product', 
                    required: true 
                },
                quantity: { 
                    type: Number, 
                    required: true, 
                    default: 1,
                    min: [1, 'Quantity must be at least 1']
                },
                price: { 
                    type: Number, 
                    required: true,
                    min: [0, 'Price must be a non-negative value']
                }
            }
        ],
        totalQuantity: { 
            type: Number, 
            default: 0 
        },
        totalPrice: { 
            type: Number, 
            default: 0 
        }
    },
    {
        timestamps: true
    }
);

// Pre-save hook to calculate totalQuantity and totalPrice
cartSchema.pre('save', function (next) {
    try {
        this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.totalPrice = this.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Cart', cartSchema);