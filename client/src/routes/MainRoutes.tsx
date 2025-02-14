// filepath: /e:/MERN/expense-tracker/client/src/routes/MainRoutes.tsx
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Expenses from '../pages/Expenses';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import Profile from '../pages/Profile';
import Categories from '../pages/Categories';

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
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/categories" element={<Categories />} /> 
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;