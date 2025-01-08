const Category = require('../models/category');
const Expense = require('../models/expense');

// Fetch all categories (default + user-specific)
const getCategories = async (req, res) => {
    const userId = req.user ? req.user.id : null;
  
    try {
      const categories = await Category.find({
        $or: [{ type: 'default' }, { userId }],
      });
      res.status(200).json({ success: true, categories: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};
  
// Add a new category
const addCategory = async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user ? req.user.id : null;
  try {
    const category = new Category({
      name,
      type: type || 'custom',
      userId: userId || null,
    });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
  
    try {
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
  
      if (category.type === 'default') {
        return res.status(400).json({ success: false, message: 'Cannot edit default categories' });
      }
  
      category.name = name || category.name;
      await category.save();
  
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};
  
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (category.type === 'default') {
      return res.status(400).json({ success: false, message: 'Cannot delete default categories' });
    }

    // Check if there are any expenses associated with this category
    const expenses = await Expense.find({ category: category.name });

    if (expenses.length > 0) {
      return res.status(400).json({ success: false, message: 'Cannot delete category with existing expenses' });
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 

module.exports = {getCategories, addCategory, updateCategory, deleteCategory};