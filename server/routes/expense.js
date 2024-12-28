const express = require('express');
const { addExpense, getExpenses } = require('../controllers/expense');

const router = express.Router();

// Route to add an expense (protected)
router.post('/add', addExpense);

// Router to get expenses of a user
router.get('/get', getExpenses);

module.exports = router;