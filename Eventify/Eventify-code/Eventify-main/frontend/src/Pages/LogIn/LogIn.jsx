import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  const logInHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[2].value,
    };
    setLoginData(data);
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response = await response.json();
    console.log(response);

    if (response.success === "false") {
      alert(response.message);
    } else {
      localStorage.setItem("token", response.token);
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
        <h2 className="text-3xl font-bold text-center text-[#9333ea]">
          Welcome Back!
        </h2>
        <form onSubmit={logInHandler} className="space-y-5">
          <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="Enter E-mail"
            className="w-full"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#9333ea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9333ea",
              },
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter Password"
            className="w-full"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#9333ea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9333ea",
              },
            }}
          />

          <div className="flex justify-between items-center">
            <Link
              to="/forget-password"
              className="text-[#9333ea] hover:underline hover:text-[#7b2acc]"
            >
              Forgot Password?
            </Link>
            <Link
              to="/signup"
              className="text-[#9333ea] hover:underline hover:text-[#7b2acc]"
            >
              Don’t have an account? Sign Up
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 bg-[#9333ea] text-white rounded-md hover:bg-[#7b2acc] transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
