import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import '../App.css';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img src="/images/h90logo.jpg" alt="App Logo" />
        </div>
        <ul className="navbar-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/summary">Summary</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        </ul>
        {isLoggedIn && (
          <button 
            onClick={handleLogout} 
            className="logout-button" 
            aria-label="Log out of your account"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;