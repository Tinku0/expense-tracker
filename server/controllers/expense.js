const ExpenseModel = require('../models/expense');

const addExpense = async (req, res, next) => {
    try {
        const { name, amount, category, description, date } = req.body;

        // Access `userId` from `req.user` (added by `verifyToken` middleware)
        const userId = req.user.id;

        // Validation
        if (!amount || !category) {
            return res.status(400).json({ message: 'Amount and category are required' });
        }

        // Create a new expense entry
        const newExpense = new ExpenseModel({
            userId,
            name,
            amount,
            category,
            description,
            date: date || new Date(), // Use provided date or default to now
        });

        // Save the expense to the database
        const savedExpense = await newExpense.save();

        res.status(201).json({ message: 'Expense added successfully', expense: savedExpense });
    } catch (error) {
        next(error); // Pass errors to the global error handler
    }
};

const getExpenses = async (req, res, next) => {
    try {
        // Access `userId` from `req.user` (added by `verifyToken` middleware)
        const userId = req.user.id;

        // Query the database for expenses associated with the userId
        const expenses = await ExpenseModel.find({ userId });

        // Return the expenses in the response
        res.status(200).json({ expenses });
    } catch (error) {
        next(error); // Pass errors to the global error handler
    }
};

module.exports = { addExpense, getExpenses }