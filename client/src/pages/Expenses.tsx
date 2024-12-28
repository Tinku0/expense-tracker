import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import ExpenseModal from '../components/ExpenseModal';
import { Expense } from '../interfaces/Expense';
import { MdOutlineDelete } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get('expense/get');
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`expense/delete/${id}`);
      toast.success('Expense deleted successfully!');
      fetchExpenses();
    } catch (error) {
      toast.error('Failed to delete expense. Please try again.');
    }
  };

  const handleModalClose = (status: string) => {
    setSelectedExpense(null);
    setIsModalOpen(false);
    if(status != 'cancel'){
      fetchExpenses();
    }
  };

  return (
    <div className="container mx-auto md:p-4">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Expense
      </button>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full bg-white hidden md:table">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 py-2 px-4 text-left">Name</th>
              <th className="w-1/4 py-2 px-4 text-left">Amount</th>
              <th className="w-1/4 py-2 px-4 text-left">Category</th>
              <th className="w-1/4 py-2 px-4 text-left">Description</th>
              <th className="w-1/4 py-2 px-4 text-left">Date</th>
              <th className="w-1/4 py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses && expenses.map((expense: Expense) => (
              <tr key={expense._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{expense.name}</td>
                <td className="py-2 px-4">{expense.amount}</td>
                <td className="py-2 px-4">{expense.category}</td>
                <td className="py-2 px-4">{expense.description}</td>
                <td className="py-2 px-4">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="flex items-center justify-center py-2 px-4 space-x-4">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="relative flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 rounded-full transition-all duration-200 hover:bg-blue-600 hover:text-white focus:outline-none"
                  >
                    <FiEdit2 className="text-lg transition-all duration-200" />
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id!)}
                    className="relative flex items-center justify-center w-10 h-10 bg-red-100 text-red-500 rounded-full transition-all duration-200 hover:bg-red-600 hover:text-white focus:outline-none"
                  >
                    <MdOutlineDelete className="text-lg transition-all duration-200" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:hidden">
          {expenses && expenses.map((expense: Expense) => (
            <div key={expense._id} className="border-b p-4 hover:bg-gray-100">
              <div className="flex justify-between items-center">
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <h3 className="text-lg font-semibold">{expense.name}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="relative flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 rounded-full transition-all duration-200 hover:bg-blue-600 hover:text-white focus:outline-none"
                      >
                        <FiEdit2 className="text-lg transition-all duration-200" />
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id!)}
                        className="relative flex items-center justify-center w-10 h-10 bg-red-100 text-red-500 rounded-full transition-all duration-200 hover:bg-red-600 hover:text-white focus:outline-none"
                      >
                        <MdOutlineDelete className="text-lg transition-all duration-200" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{expense.category}</p>
                  <p className="text-sm text-gray-600">{expense.description}</p>
                  <p className="text-sm text-gray-600">{new Date(expense.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">${expense.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ExpenseModal
          expense={selectedExpense}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Expenses;