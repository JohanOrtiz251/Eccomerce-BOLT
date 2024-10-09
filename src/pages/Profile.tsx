import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumbs from '../components/Breadcrumbs';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Your Profile</h1>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="flex items-center mb-6">
            <img
              src={user.photoURL || 'https://via.placeholder.com/100'}
              alt={user.displayName || 'User'}
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.displayName}</h2>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Account Information</h3>
            <p className="text-gray-600 dark:text-gray-300">Email: {user.email}</p>
            <p className="text-gray-600 dark:text-gray-300">Account created: {user.metadata.creationTime}</p>
            <p className="text-gray-600 dark:text-gray-300">Last sign in: {user.metadata.lastSignInTime}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;