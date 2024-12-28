// filepath: /e:/MERN/expense-tracker/client/src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainRoutes from './routes/MainRoutes';

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <MainRoutes />
      </div>
    </Router>
  );
};

export default App;