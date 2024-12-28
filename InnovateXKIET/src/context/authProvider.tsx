// "use client";
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// interface AuthContextProps {
//   isAuthenticated: boolean | null; // Allow null to signify loading state
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const auth = useSelector((state: any) => state.user.auth);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     setIsAuthenticated(!!auth);
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider!');
//   }
//   return context;
// };
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface AuthContextProps {
  isAuthenticated: boolean; // Simplify to boolean to avoid null issues
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSelector((state: any) => state.user?.auth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth);

  useEffect(() => {
    setIsAuthenticated(!!auth); // Updates based on auth changes
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider!');
  }
  return context;
};

