import React, { useState } from 'react';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      // Send login credentials to backend
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      // Save JWT to localStorage on successful login
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true); // Update login state
      setError('');
      alert('Login successful!');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
