import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ModernShop
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link to="/categories" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Categories</Link>
          <Link to="/deals" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Deals</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 relative">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <User size={20} />
                <span>{user.displayName}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Orders</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;