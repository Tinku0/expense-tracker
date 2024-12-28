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

const editExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, amount, category, description, date } = req.body;
        const userId = req.user.id;

        const updatedExpense = await ExpenseModel.findOneAndUpdate(
            { _id: id, userId },
            { name, amount, category, description, date },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
        next(error);
    }
};

const deleteExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedExpense = await ExpenseModel.findOneAndDelete({ _id: id, userId });

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        next(error);
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

module.exports = { addExpense, editExpense, deleteExpense, getExpenses }