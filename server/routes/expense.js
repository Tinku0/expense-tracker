const express = require('express');
const { addExpense, editExpense, deleteExpense, getExpenses } = require('../controllers/expense');

const router = express.Router();

router.post('/add', addExpense);
router.get('/get', getExpenses);
router.put('/edit/:id', editExpense);
router.delete('/delete/:id', deleteExpense);

module.exports = router;