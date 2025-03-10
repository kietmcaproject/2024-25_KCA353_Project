import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
// import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, ArrowRight, ArrowLeft } from "lucide-react";

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
      transform: "translate(-50%, -50%)",
    }}
  />
);

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passMatch, setPassMatch] = useState("empty");
  const navigate = useNavigate(); // Added useNavigate for navigation after successful signup

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "confirmPassword") {
      setPassMatch(value === formData.password);
    }
    if (name === "password") {
      if (formData.confirmPassword) {
        setPassMatch(value === formData.confirmPassword);
      }
    }
  };

  // Updated submitHandler function
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPass: formData.confirmPassword,
    };

    let response = await fetch("https://project-hub-backend-seven.vercel.app/api/v1/signup", {
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
      navigate("/login");
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
      "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
      "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
    "& .MuiOutlinedInput-input": { color: "white" },
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

      {/* Sign Up Form */}
      <div
        className={`relative w-full max-w-md transform transition-all duration-1000
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-blue-500/10 mb-4">
              <CircleUserRound size={40} className="text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Step {step} of 2</p>
          </div>

          <form onSubmit={step === 1 ? nextStep : submitHandler} className="space-y-6">
            {step === 1 ? (
              <>
                <TextField
                  required
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={textFieldStyles}
                />

                <TextField
                  required
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={textFieldStyles}
                />

                <TextField
                  required
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={textFieldStyles}
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                    py-3 px-4 font-medium transform hover:scale-[1.02] transition-all duration-200
                    hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500
                    focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <TextField
                  required
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={textFieldStyles}
                />

                <TextField
                  required
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={textFieldStyles}
                />

                {passMatch === true && (
                  <p className="text-green-400 text-sm">Passwords match!</p>
                )}
                {passMatch === false && (
                  <p className="text-red-400 text-sm">Passwords don't match!</p>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 border border-blue-400 text-blue-400 rounded-lg py-3 px-4 
                      font-medium transform hover:scale-[1.02] transition-all duration-200 
                      hover:bg-blue-400/10 flex items-center justify-center"
                  >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                      py-3 px-4 font-medium transform hover:scale-[1.02] transition-all duration-200
                      hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500
                      focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}

            <div className="flex justify-center text-sm">
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-500"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
