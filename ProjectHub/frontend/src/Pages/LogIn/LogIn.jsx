import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

const GlowingOrb = ({ delay = 0, color1, color2 }) => (
  <div 
    className="absolute rounded-full animate-pulse blur-xl opacity-20"
    style={{
      background: `radial-gradient(circle at center, ${color1}, ${color2})`,
      width: `${200 + Math.random() * 300}px`,
      height: `${200 + Math.random() * 300}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      transform: 'translate(-50%, -50%)',
    }}
  />
);

const LogIn = () => {
  const [loginData, setLoginData] = useState({});
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logInHandler = async(e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[2].value,
    };
    setLoginData(data);
    
    try {
      let response = await fetch('https://project-hub-backend-seven.vercel.app/api/v1/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      response = await response.json();
      
      if(response.success === "false"){
        alert(response.message);
      } else {
        localStorage.setItem('token', response.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Glowing Orbs */}
        <GlowingOrb color1="#4F46E5" color2="#2563EB" delay={0} />
        <GlowingOrb color1="#7C3AED" color2="#4F46E5" delay={2} />
        <GlowingOrb color1="#2563EB" color2="#3B82F6" delay={4} />
      </div>

      {/* Login Form */}
      <div 
        className={`relative w-full max-w-md transform transition-all duration-1000
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden
          border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-blue-500/10 mb-4">
              <CircleUserRound size={40} className="text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Please sign in to continue</p>
          </div>

          <form onSubmit={logInHandler} className="space-y-6">
            <TextField
              required
              label="Email Address"
              placeholder="Enter your email"
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&.Mui-focused fieldset': { borderColor: '#3B82F6' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                '& .MuiOutlinedInput-input': { color: 'white' },
              }}
            />
            
            <TextField
              type="password"
              label="Password"
              placeholder="Enter your password"
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&.Mui-focused fieldset': { borderColor: '#3B82F6' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                '& .MuiOutlinedInput-input': { color: 'white' },
              }}
            />

            <div className="flex justify-between items-center text-sm">
              <Link 
                to="/forget-password" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot Password?
              </Link>
              <Link 
                to="/signup" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create Account
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                py-3 px-4 font-medium transform hover:scale-[1.02] transition-all duration-200
                hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500
                focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;