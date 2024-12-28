import React, { useState, useEffect } from "react";
import "./signup.css";
import logo from "/logo.png";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  useEffect(() => {
    document.title = "Signup";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
  });
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    if (formData.profilePic) {
      formDataToSend.append("profilePic", formData.profilePic);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      setLoading(false); // Stop loading after response

      if (data.success) {
        toast.success("Account created successfully!");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);
        setFormData({ name: "", email: "", password: "", profilePic: null });
        setTimeout(() => {
          window.location.href = "/feed";
        }, 1500);
      } else {
        toast.error(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      toast.error("Error: " + error.message);
    }
  };

  return (
    <main>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="signup-container">
        <div className="signup-left">
          <img src={logo} className="logo" alt="Logo" />
          <h1>Create Your Account</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading} // Disable input when loading
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading} // Disable input when loading
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Type Your Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading} // Disable input when loading
              />
            </div>
            <div className="input-group">
              <label
                style={{ textAlign: "left", color: "white", fontSize: "20px" }}
              >
                Profile Pic
              </label>
              <input
                required
                type="file"
                name="profilePic"
                className="form-input"
                onChange={handleFileChange}
                disabled={loading} // Disable input when loading
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="signup-right">
          <h2>Already Have an Account?</h2>
          <p>Log in to explore more features.</p>
          <NavLink to="/login">
            <button className="btn btn-secondary" disabled={loading}>
              Log In
            </button>
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
