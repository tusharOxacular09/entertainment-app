import React from 'react';
import { useNavigate } from 'react-router-dom';

// Page Not Found Page
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-2xl text-gray-200">Page Not Found</p>
        <p className="text-gray-300 mt-4">
          The page you are looking for might be in another castle.
        </p>
        <button
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => navigate('/root/home')}
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default NotFound;