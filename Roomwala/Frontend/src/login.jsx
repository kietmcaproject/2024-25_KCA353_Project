import { NavLink, useNavigate,useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Login = ({ token, settoken }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const roomid = searchParams.get('roomid');
  const checkout = searchParams.get('checkout');
  const redirect = searchParams.get('redirect');
  const emailid = searchParams.get('email');
  useEffect(() => {
    if (emailid) {
      setEmail(emailid);
    }
  }, [emailid]);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      settoken(data.token);
      if (checkout) {
        navigate(`/checkout?roomid=${roomid}`);
        toast.success(`Welcome to RoomWala`);
        return;
      }
      toast.success(`Welcome to RoomWala`);
      navigate('/');
    } else {
      toast.error("Invalid Credentials");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <div className="mb-6">
        <img className="w-24 h-24 object-contain" src="./logo/logo-removebg-preview.png" alt="Logo" />
      </div>
      <div>
        <h6 className="text-center text-2xl font-semibold">Please Login to your account</h6>
      </div>
      <div className="form-container mt-6">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input 
            type="text" 
            name="email" 
            onChange={(e) => { setEmail(e.target.value) }} 
            value={email}
            placeholder="Enter your Email id" 
            className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md" 
          />
          <input 
            type="password" 
            name="password" 
            onChange={(e) => { setPassword(e.target.value) }} 
            placeholder="Password" 
            className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md" 
          />
          <div className="flex items-center mb-4">
            <input id="check1" type="checkbox" className="mr-2" checked />
            <label htmlFor="check1" className="text-lg">Remember Me</label>
          </div>
          <button type="submit" className="w-full max-w-md bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition duration-300">Log In</button>
        </form>
        <div className="flex justify-between mt-4 w-full max-w-md">
          <NavLink to='/signup' className="text-cyan-500 hover:underline">Sign up</NavLink>
          <NavLink to='/forgotpassword' className="text-cyan-500 hover:underline">Forgot Password?</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login;
