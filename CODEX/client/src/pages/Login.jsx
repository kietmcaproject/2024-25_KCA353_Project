import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const BURL = import.meta.env.VITE_BACKEND_URL;
  const { from } = location.state || { from: { pathname: "/" } };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace 'localhost' with your EC2 public IP
      const response = await axios.post(`${BURL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      navigate(from.pathname); // Navigate to the original page
      toast.success("Logged in successfully");
    } catch (err) {
      console.log(err.response?.message || err.message || "Error in logging in");
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e1e1e] border border-emerald-800 rounded-lg shadow-lg shadow-emerald-800/20 p-6 space-y-6">
        <h2 className="text-center text-2xl font-semibold text-emerald-400">
          Welcome back to <span className="text-emerald-500">CODEX</span>,
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black border border-emerald-800 text-emerald-300 placeholder-emerald-500 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-emerald-800 text-emerald-300 placeholder-emerald-500 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg h-12 text-lg transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-emerald-400">
          Don&apos;t have an account? Sign up{" "}
          <Link
            to="/signup"
            className="text-emerald-500 hover:text-emerald-400 underline"
          >
            here
          </Link>
        </p>
      </div>
      <footer className="mt-8 text-center text-sm text-emerald-500">
        Built with <span className="text-emerald-400">💛</span> by{" "}
        <Link
          to="/ContributorsPage"
          className="text-emerald-500 hover:text-emerald-400"
        >
          Team Codex
        </Link>
      </footer>
    </div>
  );
};

export default Login;
