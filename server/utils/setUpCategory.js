const mongoose = require('mongoose');
const Category = require('../models/category');

// Define default categories
const defaultCategories = ['Food', 'Travel', 'Shopping', 'Bills'];

const seedDefaultCategories = async () => {
  try {
    for (const name of defaultCategories) {
      const exists = await Category.findOne({ name, type: 'default' });
      if (!exists) {
        await Category.create({ name, type: 'default' });
        console.log(`Default category "${name}" added.`);
      }
    }
    console.log('Default categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding default categories:', error.message);
  }
};

module.exports = seedDefaultCategories;