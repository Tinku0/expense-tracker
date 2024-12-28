import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Define the type for ProtectedRoute props
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage

  if (!token) {
    // If token is not found, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;  // If token is found, render the children (protected route)
};

export default ProtectedRoute;