import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('kiet.edu')) {
      setError('Please use a valid KIET email address');
      return;
    }

    sendDataToBackend({ email, password });
  };

  const sendDataToBackend = ({ email, password }) => {
    // Send the data to the backend

    axios.post('http://localhost:3000/login', { email, password }).then((response) => {
      if (response.data.status == "success") {
        // Store the user data in local storage
        localStorage.setItem('userData', JSON.stringify(response.data));
        // Redirect to the home page
        window.location.href = '/';
      }
    }).catch((err) => {
      console.log(err);
    })

    // Clear form fields after submission
    setEmail('');
    setPassword('');

  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  };

  const iconStyle = {
    marginRight: '8px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1877f2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const errorStyle = {
    color: '#ff3333',
    marginBottom: '15px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={titleStyle}>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" style={labelStyle}>
              <Mail size={18} style={iconStyle} />
              College Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              placeholder="youremail@kiet.edu"
            />
          </div>
          <div>
            <label htmlFor="password" style={labelStyle}>
              <Lock size={18} style={iconStyle} />
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
              placeholder="Enter your password"
            />
          </div>
          {error && <p style={errorStyle}>{error}</p>}
          <button type="submit" style={buttonStyle}>
            <LogIn size={18} style={iconStyle} />
            Log In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '14px' }}>
          Don't have an account?<Link to={'/signup'}><u>sign up</u></Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;