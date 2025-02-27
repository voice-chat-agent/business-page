import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling

const Navbar = ({ token, handleLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">OurBusiness</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/login">Login</Link>

        {token && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
