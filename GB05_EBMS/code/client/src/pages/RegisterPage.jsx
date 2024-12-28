/* eslint-disable no-empty */
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('attendee'); // New state for role
  const [redirect, setRedirect] = useState('');

  async function registerUser(ev) {
    ev.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('/register', {
        name,
        email,
        password,
        role // Include the selected role in the registration data
      });
      alert('Registration Successful');
      setRedirect(true);
    } catch (e) {
      alert('Registration failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="flex w-full h-full lg:-ml-24 px-10 py-10 justify-between place-items-center mt-12">
      <div className="hidden lg:flex flex-col right-box ">
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-black">Welcome to</div>
          <div>
            <img src="../src/assets/logo.png" alt="" className="w-48" />
          </div>
        </div>
        <div className="ml-48 w-80 mt-6">
          <img src="../src/assets/signuppic.svg" alt="" className='w-full' />
        </div>
      </div>
      <div className="bg-white w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-7 rounded-xl justify-center align-middle ">
        <form className="flex flex-col w-auto items-center" onSubmit={registerUser}>
          <h1 className='px-3 font-extrabold mb-5 text-primarydark text-2xl'>Sign Up</h1>

          {/* Role Dropdown */}
          <div className="input mb-4">
            <select 
              value={role} 
              onChange={ev => setRole(ev.target.value)} 
              className="input-et"
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          {/* Other input fields remain unchanged */}
          <div className="input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              {/* SVG Path for Name Icon */}
            </svg>
            <input type="text" placeholder="Name" className="input-et" value={name} onChange={ev => setName(ev.target.value)} />
          </div>

          <div className="input">
            {/* SVG and input for Email */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              {/* SVG Path for Email Icon */}
            </svg>
            <input type="email" placeholder="Email" className="input-et" value={email} onChange={ev => setEmail(ev.target.value)} />
          </div>

          <div className="input">
            {/* SVG and input for Password */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              {/* SVG Path for Password Icon */}
            </svg>
            <input type="password" placeholder="Password" className="input-et" value={password} onChange={ev => setPassword(ev.target.value)} />
          </div>

          <div className="input">
            {/* SVG and input for Confirm Password */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              {/* SVG Path for Confirm Password Icon */}
            </svg>
            <input type="password" placeholder="Confirm password" className="input-et" value={confirmPassword} onChange={ev => setConfirmPassword(ev.target.value)} />
          </div>

          <div className="w-full py-4">
            <button type="submit" className="primary w-full"> Create Account </button>
          </div>

          <Link to={'/'}>
            <button className="secondary">
              {/* Back Button SVG */}
              Back
            </button>
          </Link>

        </form>
      </div>
    </div>
  );
}
