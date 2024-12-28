"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authProvider';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage redirection
  const router = useRouter();

  useEffect(() => {
    // If isAuthenticated is still null, we should wait for it to resolve
    if (isAuthenticated === null) return;

    if (isAuthenticated === false) {
      router.push('/user/landingPage'); // Redirect if not authenticated
    } else {
      setIsLoading(false); // No redirect, so stop loading
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth state
  }

  return <>{children}</>; // Render the children (protected component) when authenticated
};

export default PrivateRoute;
