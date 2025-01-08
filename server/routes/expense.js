const express = require('express');
const { addExpense, editExpense, deleteExpense, getExpenses, getExpensesByDate, getExpensesByDateRange } = require('../controllers/expense');

const router = express.Router();

router.post('/add', addExpense);
router.get('/get', getExpenses);
router.get('/get/date/:date', getExpensesByDate);
router.get('/get/daterange', getExpensesByDateRange);
router.put('/edit/:id', editExpense);
router.delete('/delete/:id', deleteExpense);

module.exports = router;