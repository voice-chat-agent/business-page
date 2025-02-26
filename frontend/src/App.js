import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
  };

  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/signup">Sign Up</Link> |{' '}
        <Link to="/login">Login</Link> 
        {token && (
          <>
            {' '}| <Link to="/dashboard">Dashboard</Link>
            {' '}| <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home token={token} user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <p>Please log in to access the dashboard.</p>} />
      </Routes>
    </Router>
  );
}

export default App;
