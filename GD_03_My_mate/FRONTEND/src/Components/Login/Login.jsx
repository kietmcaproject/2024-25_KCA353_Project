import React, { useState, useEffect } from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import logo from "/logo.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'omit', // Important for sending cookies
      });

      const data = await response.json();
      setLoading(false); // Stop loading after response

      if (!response.ok) {
        // Show error toast
        toast.error(data.message || "Failed to login. Please try again.");
      } else if (data.success) {
        toast.success("Login successful!");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);
        setFormData({ email: '', password: '' });
        setTimeout(() => {
          window.location.href = '/feed'; // Redirect to home page on success
        }, 1500); // Add slight delay to allow toast display
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <main>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='login-container'>
        <div className='login-left'>
          <img src={logo} className='logo' alt="logo" />
          <h1>Log In to Your Account</h1>
          <form className='form' onSubmit={handleSubmit}>
            <div className='input-group'>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading} // Disable input when loading
              />
            </div>
            <div className='input-group'>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading} // Disable input when loading
              />
            </div>
            <button type='submit' className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <div className='login-right'>
          <h2>New Here?</h2>
          <p>Sign up and discover a great amount of new opportunities.</p>
          <NavLink to="/signup">
            <button className="btn btn-secondary" disabled={loading}>
              Sign Up
            </button>
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default Login;
