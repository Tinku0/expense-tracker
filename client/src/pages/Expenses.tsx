import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assuming token is stored in localStorage
      };
      const response = await axiosInstance.get(import.meta.env.VITE_API_BASE_URL + 'expense/get', { headers });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex my-2 items-center justify-between'>
        <h1 className="text-2xl font-bold">Expenses</h1>
        <Link to='/home'><button className='bg-zinc-700 px-3 py-2 rounded-md text-white'>Add Expense</button></Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {expenses.length ? <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 py-2 px-4 text-left">Title</th>
              <th className="w-1/4 py-2 px-4 text-left">Amount</th>
              <th className="w-1/4 py-2 px-4 text-left">Category</th>
              <th className="w-1/4 py-2 px-4 text-left">Description</th>
              <th className="w-1/4 py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense: any) => (
              <tr key={expense._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{expense.name}</td>
                <td className="py-2 px-4">{expense.amount}</td>
                <td className="py-2 px-4">{expense.category}</td>
                <td className="py-2 px-4">{expense.description}</td>
                <td className="py-2 px-4">{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table> : <p className='p-3'>No Expenses Found</p>}
      </div>
    </div>
  );
};

export default Expenses;