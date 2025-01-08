export interface Expense {
    _id: string;
    name: string;
    amount: number;
    category: string;
    description: string;
    date: string;
  }
  
  export interface ExpenseModalProps {
    expense: Expense | null;
    onClose: () => void;
  }