import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Import the CSS file for styling

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        userId,
        password,
      });
      const { token, role: fetchedRole } = res.data;

      // Save token to local storage
      localStorage.setItem('authToken', token);

      // Redirect based on fetched role
      switch (fetchedRole) {
        case 'student':
          navigate(`/student/${userId}`);
          break;
        case 'hod':
          navigate(`/hod/${userId}`);
          break;
        case 'warden':
          navigate('/warden');
          break;
        case 'guard':
          navigate('/guard');
          break;
        default:
          setError('Unknown role, please try again.');
      }
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <h2 className = "login">Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="idk">
          <div className="form-group-2">
            <label>Username:</label>
            <input
              type="text" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group-2">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
          {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
          </div>
        </form>
        {/* <p className="signup-text">Don't have an account? <a href="#" className="signup-link">Sign up</a></p> */}
      </div>
      <div className="right-section">
        <h1 className="white">Welcome to student portal</h1>
        <p className="black">Login to access your account</p>

        <div className="illustration">
         <img src="https://th.bing.com/th/id/R.72f859a9e59a10a83f86d7b82a59620e?rik=G3gY0VZKcHTOjg&riu=http%3a%2f%2fkoha.kiet.edu%2fopac-tmpl%2fbootstrap%2fimages%2flogo.png&ehk=JJRCJyIBhT6iVygrEaV4mmiYwHYUVWnrrrGYn4%2bsGm0%3d&risl=&pid=ImgRaw&r=0" height="140px" width="140px" alt="Illustration"/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
