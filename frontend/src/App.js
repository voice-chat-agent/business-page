import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import HospitalForm from './components/HospitalForm';
import Navbar from './components/Navbar'; // Import Navbar

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
      <Navbar token={token} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home token={token} user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <p>Please log in to access the dashboard.</p>} />
        <Route path="/hospital" element={<HospitalForm />} />
      </Routes>
    </Router>
  );
}

export default App;