import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import '../App.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setError('');
      navigate('/dashboard'); 
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container" role="main" aria-labelledby="login-heading">
      <div className="login-card">
        <h1 id="login-heading">Login</h1>
        <form 
          onSubmit={handleSubmit} 
          aria-labelledby="login-heading" 
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-required="true"
              aria-describedby="username-help"
              aria-label="Enter your username"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              aria-describedby="password-help"
              aria-label="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p 
              role="alert" 
              aria-live="assertive" 
              style={{ color: 'red' }}
            >
              {error}
            </p>
          )}

          <button type="submit" aria-label="Log in to your account">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


export default Login;
