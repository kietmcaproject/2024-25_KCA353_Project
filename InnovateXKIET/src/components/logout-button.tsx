"use client"; // Mark this file as a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct use of useRouter in the app directory
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/lib/Redux/slices/userSlice';

const LogoutButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users/logout', {
        method: 'GET',
        credentials: 'include', // This ensures cookies are included in the request
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Logout failed');
      }

      dispatch(logoutUser());
      // Redirect to the login page after successful logout
      router.push('/landingpage');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Other side navigation items go here */}
      
      <button
        onClick={handleLogout}
        className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-200"
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LogoutButton;