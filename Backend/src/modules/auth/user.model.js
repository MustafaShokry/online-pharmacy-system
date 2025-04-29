const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, 'Street address is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    state: {
        type: String,
        required: [true, 'State is required'],
    },
    zipCode: {
        type: String,
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    }
}, { _id: false });

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        age: {
            type: Number,
            min: [0, 'Age cannot be negative'],
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
        },
        address: addressSchema,
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        passwordResetToken: {
            type: String,
            select: false,
        },
        passwordResetExpires: {
            type: Date,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
