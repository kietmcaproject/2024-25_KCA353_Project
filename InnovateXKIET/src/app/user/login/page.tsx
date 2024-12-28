"use client"; // Mark this component as a Client Component

import { useState } from "react"; // Import useState to manage component state
import { useRouter } from "next/navigation"; // Import useRouter for client-side routing
import { useDispatch } from "react-redux"; // Redux hook to dispatch actions
import {
  loginUser,
  setUserId,
  setUsername,
} from "@/lib/Redux/slices/userSlice"; // Import loginUser action from the user slice
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import icons from react-icons

export default function Login() {
  const router = useRouter(); // Create a router instance for navigation
  const dispatch = useDispatch(); // Create a dispatch instance to trigger Redux actions
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  // Initialize state for form data, error messages, and loading status
  const [formData, setFormData] = useState({
    email: "", // Email input field
    password: "", // Password input field
  });
  const [error, setError] = useState<string | null>(null); // State for storing error messages
  const [loading, setLoading] = useState(false); // State for loading status during submission

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Make sure cookies are included
      });

      const data = await res.json();
      const userId = data.userId; // Assuming your response contains the userId
      sessionStorage.setItem("userId", userId);

      // Dispatch the userId and username to Redux store
      dispatch(setUserId(userId));
      dispatch(setUsername(data.username));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Dispatch loginUser action to Redux store with email and username
      dispatch(loginUser({ email: formData.email }));

      // Alert success message and redirect to the homepage or dashboard
      alert("Logged in successfully");
      router.push("/user/feeds");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-full bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div> */}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="block w-full p-2 pr-10 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/user/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
        <p className="mt-4 text-center">
          Verify your account :{" "}
          <a href="/user/afterEmailVerification" className="text-blue-500">
            Verify
          </a>
        </p>
      </div>
    </div>
  );
}
