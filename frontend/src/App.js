import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Summary from './pages/Summary';
import Reports from './pages/Reports';
import NavBar from './components/NavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token in localStorage to update login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      {isLoggedIn && <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
