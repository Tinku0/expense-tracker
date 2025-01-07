const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['default', 'custom'],
    default: 'custom',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Null for default categories
  },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;