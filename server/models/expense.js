const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Others'], // Optional predefined categories
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true });

const ExpenseModel = mongoose.model('Expense', ExpenseSchema);

module.exports = ExpenseModel;