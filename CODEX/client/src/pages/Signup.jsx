import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BURL = import.meta.env.VITE_BACKEND_URL;
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Replace 'localhost' with your EC2 public IP
      const response = await axios.post(`${BURL}/signup`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      toast.success("Welcome to the CODEX community");
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      console.error(
        "Error signing up:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e1e1e] border border-emerald-800 rounded-lg shadow-lg shadow-emerald-800/20 p-6 space-y-6">
        <h2 className="text-center text-2xl font-semibold text-emerald-400">
          Create your account on <span className="text-emerald-500">CODEX</span>
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
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
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-emerald-400">
          Already have an account? Login{" "}
          <Link
            to="/login"
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

export default SignUp;
