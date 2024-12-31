import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface User {
  name: string | null;
  email: string | null;
}

interface NavbarProps {
  user?: User;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              Expense Tracker
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <p className="text-white">Welcome, {user?.name}</p>
            <Link
              to="/expenses"
              className={location.pathname === '/expenses' ? 'p-2 rounded text-gray-800 bg-white' : 'text-white hover:text-gray-700 hover:bg-white px-3 py-2 rounded-md text-md font-medium'}
            >
              Expenses
            </Link>
            <Link
              to="/profile"
              className={location.pathname === '/profile' ? 'p-2 rounded text-gray-800 bg-white' : 'text-white hover:text-gray-700 hover:bg-white px-3 py-2 rounded-md text-md font-medium'}
            >
              Profile
            </Link>
            {true && (
              <>
                <button
                  onClick={onLogout}
                  className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link
              to="/home"
              className="block text-white hover:text-gray-300 px-3 py-2 rounded-md text-lg font-medium"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="block text-white hover:text-gray-300 px-3 py-2 rounded-md text-lg font-medium"
            >
              Profile
            </Link>
            {user ? (
              <>
                <span className="block text-white px-3 py-2">{user.name}</span>
                <button
                  onClick={onLogout}
                  className="block w-full text-left text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:text-gray-300 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-white hover:text-gray-300 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;