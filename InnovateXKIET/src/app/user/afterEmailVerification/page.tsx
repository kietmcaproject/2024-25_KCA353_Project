// EmailVerification.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation

const EmailVerification: React.FC = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  // Handle email verification after token input
  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send the token to the API to verify email
      const res = await fetch("/api/users/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Email Verified Successfully!");
        router.replace("/user/login"); // Use replace for navigation
      } else {
        throw new Error(data.error || "Invalid Token");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Verify Your Email
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleVerifyEmail}>
          {/* Token input field */}
          <div className="mb-4">
            <label
              htmlFor="token"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enter Verification Token
            </label>
            <input
              type="text"
              name="token"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded"
              placeholder="Enter the token sent to your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Already verified?{" "}
          <a href="/user/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        {/* Link to signup page */}
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <a href="/user/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );

  // return (
  //   <div className=" flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  //     <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
  //       <h1 className="text-2xl font-bold mb-6 text-center">
  //         Verify Your Email
  //       </h1>
  //       {error && <p className="text-red-500 mb-4">{error}</p>}

  //       <form onSubmit={handleVerifyEmail}>
  //         {/* Token input field */}
  //         <div className="mb-4">
  //           <label
  //             htmlFor="token"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Enter Verification Token
  //           </label>
  //           <input
  //             type="text"
  //             name="token"
  //             id="token"
  //             value={token}
  //             onChange={(e) => setToken(e.target.value)}
  //             required
  //             className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:text-white rounded"
  //             placeholder="Enter the token sent to your email"
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${
  //             loading ? "opacity-50 cursor-not-allowed" : ""
  //           }`}
  //         >
  //           {loading ? "Verifying..." : "Verify Email"}
  //         </button>
  //       </form>

  //       <p className="mt-4 text-center">
  //         Already verified?{" "}
  //         <a href="/user/login" className="text-blue-500">
  //           Login
  //         </a>
  //       </p>
  //       {/* Link to signup page */}
  //       <p className="mt-4 text-center">
  //         Don't have an account?{" "}
  //         <a href="/user/signup" className="text-blue-500">
  //           Sign up
  //         </a>
  //       </p>
  //     </div>
  //   </div>
  // );
};

export default EmailVerification;
