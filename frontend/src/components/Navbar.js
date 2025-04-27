import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS for styling

const Navbar = ({ token, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Helix AI</Link>

      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>

        {/* Dropdown for Products */}
        <div 
          className="dropdown" 
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span className="dropdown-toggle">Products</span>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/dashboard" className="dropdown-item">Helix</Link>
            </div>
          )}
        </div>

        {/* Only show SignUp and Login if user is not logged in */}
        {!token && (
          <>
            <Link to="/signup" className="nav-item">SignUp</Link>
            <Link to="/login" className="nav-item">Login</Link>
          </>
        )}

        {token && (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;