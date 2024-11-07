import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT from localStorage
    setIsLoggedIn(false); // Update login state
    navigate('/'); // Redirect to login
  };

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/summary">Summary</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;