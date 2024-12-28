// filepath: /e:/MERN/expense-tracker/client/src/routes/MainRoutes.tsx
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Expenses from '../pages/Expenses';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;