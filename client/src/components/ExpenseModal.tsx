import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import { Expense } from '../interfaces/Expense';
import CreatableSelect from 'react-select/creatable';

interface ExpenseModalProps {
    expense: Expense | null;
    onClose: (status: string) => void;
}

interface Category {
  name: string,
  type: string,
  userId: null | string
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ expense, onClose }) => {
  const [formData, setFormData] = useState<Expense>({
    name: '',
    amount: 0,
    category: '',
    description: '',
    date: '',
  });
  const [categories, setCategories] = useState<{ value: string, label: string }[]>([]);

  useEffect(() => {
    getCategories();
    if (expense) {
      setFormData({
        ...expense,
        date: new Date(expense.date).toISOString().split('T')[0], // Format the date to YYYY-MM-DD
      });
    }
  }, [expense]);

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(import.meta.env.VITE_API_BASE_URL+'category/get');
        console.log(response)
      setCategories(response.data.categories.map((category: Category) => ({ value: category.name, label: category.name })));
    } catch (error) {
      toast.error('Failed to fetch categories. Please try again.');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (expense) {
        await axiosInstance.put(`expense/edit/${expense._id}`, formData);
        toast.success('Expense updated successfully!');
      } else {
        await axiosInstance.post('expense/add', formData);
        toast.success('Expense added successfully!');
      }
      onClose('success');
    } catch (error) {
      toast.error('Failed to save expense. Please try again.');
    }
  };

  const handleCategoryChange = (newValue: any) => {
    setFormData({
      ...formData,
      category: newValue ? newValue.value : '',
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{expense ? 'Edit Expense' : 'Add Expense'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Expense Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter expense name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Others">Others</option>
            </select>
          </div> */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <CreatableSelect
              isClearable
              options={categories}
              value={categories.find((option) => option.value === formData.category)}
              onChange={handleCategoryChange}
              className="mt-2"
              placeholder="Select or create category"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {expense ? 'Update Expense' : 'Add Expense'}
            </button>
            <button
              type="button"
              onClick={() => onClose('cancel')}
              className="ml-4 px-6 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;