import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import bcyrpt from 'bcryptjs';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');


    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email.endsWith('kiet.edu')) {
      setError('Please use a valid kiet email address');
      return;
    }

    // now send the data to the backend.
    sendDataToBackend({ firstName, lastName, email, password });


    // Clear form fields after successful submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

  };


  //send the data to the backend.
  const sendDataToBackend = async ({ firstName, lastName, email, password }) => {

    // Hash the password
    var salt = bcyrpt.genSaltSync(10);
    var hash = bcyrpt.hashSync(password, salt);

    try {
      const data = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: hash
      };

      // Await the result of the axios post call
      const response = await axios.post('http://localhost:3000/register', data);

      // If successful, log the response
      const localData = response.data;

      localStorage.setItem('userData', JSON.stringify(localData));

      //reload the page to the home.
      window.location.href = '/';

    } catch (error) {
      // If an error occurs, log the error
      console.log(error);
    }

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

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: '#fff',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Signup to Project Jugaad</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="firstName" style={labelStyle}>
              <User size={18} style={iconStyle} />
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={inputStyle}
              placeholder="John"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="lastName" style={labelStyle}>
              <User size={18} style={iconStyle} />
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={inputStyle}
              placeholder="Doe"
            />
          </div>
        </div>
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
            placeholder="johndoe@kiet.edu"
          />
        </div>
        {/* <div>
          <label htmlFor="phone" style={labelStyle}>
            <Mail size={18} style={iconStyle} />
            Phone Number
          </label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={inputStyle}
            placeholder="+918338495043"
          />
        </div> */}
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
        <div>
          <label htmlFor="confirmPassword" style={labelStyle}>
            <Lock size={18} style={iconStyle} />
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
            placeholder="Confirm your password"
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UserPlus size={18} style={{ marginRight: '8px' }} />
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;