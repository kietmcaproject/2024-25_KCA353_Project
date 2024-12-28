"use client";

import React from "react";
import LogoutButton from "@/components/logout-button";
import PrivateRoute from "@/components/privateRoute";

const LogoutPage: React.FC = () => {
  return (
    <PrivateRoute>
      <div className="flex flex-col items-center justify-center mt-56">
        <h1 className="text-3xl font-bold mb-6"></h1>
        <p className="text-lg text-center mb-4">
          Are you sure you want to log out? Logging out will end your current
          session and you will need to log in again to access your account.
        </p>
        <p className="text-sm text-gray-500 text-center mb-6">
          If you didn't intend to log out, you can navigate back to the
          dashboard or explore other pages in your account.
        </p>
        <LogoutButton />
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:ananddhardwivedi05@gmail.com"
              className="text-blue-600 underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default LogoutPage;
