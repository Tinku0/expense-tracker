const express = require('express');
const {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require('../controllers/category');

const router = express.Router();

router.post('/add', addCategory); // Add category
router.get('/get', getCategories); // Get categories
router.delete('/:categoryId', deleteCategory); // Delete category
router.put('/:categoryId', updateCategory); // Update category

module.exports = router;
