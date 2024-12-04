import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Summary from './pages/Summary';
import Reports from './pages/Reports';
import NavBar from './components/NavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // PrivateRoute component that redirects to login if the user is not authenticated
  const PrivateRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isLoggedIn && <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/summary" element={<PrivateRoute element={<Summary />} />} />
        <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
      </Routes>
    </Router>
  );
}

export default App;
