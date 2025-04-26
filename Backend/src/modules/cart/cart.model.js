import { mongoose } from 'mongoose';

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
                    default: 1 
                },
                price: { 
                    type: Number, 
                    required: true 
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
    this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    next();
});

export const cartModel = mongoose.model('Cart', cartSchema);