import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils.js';
import lap from "./laptop-bg.png";
import apple from "./wapple.png";
import google from "./google.png";
import logo from "./logo.png";
import "react-toastify/dist/ReactToastify.css";
// import { NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (username) => {
    username.preventDefault();
    localStorage.setItem("loggedInUser", username);
  console.log("User logged in:", username); 
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = `http://localhost:4003/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#07012d] to-[#3c003e]  flex place-items-center justify-center font-classy ">
      <div className="w-3/5 h-3/4 bg-white flex rounded-3xl ">
        <div>
          <img className=" ml-6 mt-3 w-40 absolute h-24 " src={logo} alt="" />
        </div>
        <img src={lap} className="mt-[70px]" alt="" />

        <div className="pt-20 -ml-8">
          <h1 className="text-4xl text-center -ml-14">Welcome Back !</h1>
          <div className="mt-10">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="border-[2px] rounded-full  w-[330px] border-gray-200 p-2 px-5 text-lg "
              placeholder="Email"
              value={loginInfo.email}
              // onChange={(e) => (user.email = e.target.value)}
            />
            <input
               onChange={handleChange}
               type='password'
               name='password'
              className="border-[2px] rounded-full  w-[330px] border-gray-200 p-2 px-5 mt-5 text-lg "
              placeholder="Password"
              value={loginInfo.password}
              // onChange={(e) => (user.password = e.target.value)}
            />
            <h6 className="underline text-gray-500 mt-1 cursor-pointer hover:text-gray-700  ml-[200px]">
              Forgot Password?{" "}
            </h6>
            <NavLink to="/Dashboard">
              <button
                className=" w-[310px] ml-2 text-white p-1 hover:bg-[#57015a] bg-[#3c003e] mt-2 rounded-full"
                onClick={handleLogin}
              >
                Log In{" "}
              </button>
            </NavLink>

            <h3 className="text-s mt-3 ml-5 ">
              Don't have an account?{" "}
              <NavLink to="/Signup">
                <button>
                  {" "}
                  <span className="underline cursor-pointer text-[#3c003e]">
                    Sign Up
                  </span>
                </button>{" "}
              </NavLink>
            </h3>
            <button className="bg-black flex gap-3 justify-center text-white w-[330px] mt-2 rounded-full p-2">
              {" "}
              <img src={apple} alt="" className="w-5 mt-[1px] " />
              Log in with Apple
            </button>
            <button className="border-2 border-black flex gap-3 justify-center text-black w-[330px] mt-2 rounded-full p-2">
              {" "}
              <img src={google} alt="" className="w-5 mt-[1px] " />
              Log in with Google
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
