import  { useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (data.success) {
      toast.success('OTP sent to your email');
      setIsOtpSent(true);
    } else {
      toast.error('Email not found');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();
    if (data.success) {
      toast.success('OTP verified, please change your password');
      setIsOtpVerified(true);
    } else {
      toast.error('Invalid OTP');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword || !newPassword || !confirmPassword || newPassword.length < 6) {
      toast.error("Passwords do not match or password length is less than 6 characters");
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await res.json();
    if (data.success) {
      toast.success('Password changed successfully');
      navigate('/login');
    } else {
      toast.error('Error changing password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">Enter your email to reset your password</p>

        {!isOtpSent ? (
          <form onSubmit={handleEmailSubmit} className="flex flex-col items-center">
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email id"
              className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button type="submit" className="w-full max-w-md bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition duration-300">Submit</button>
          </form>
        ) : !isOtpVerified ? (
          <form onSubmit={handleOtpSubmit} className="flex flex-col items-center">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button type="submit" className="w-full max-w-md bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition duration-300">Verify OTP</button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="flex flex-col items-center">
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button type="submit" className="w-full max-w-md bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition duration-300">Change Password</button>
          </form>
        )}

        <div className="flex justify-between mt-4 w-full max-w-md">
          <NavLink to='/login' className="text-cyan-500 hover:underline">Back to Login</NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
