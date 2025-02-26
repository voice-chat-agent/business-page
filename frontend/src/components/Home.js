import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Styling file

const Home = ({ token, user }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      alert("Please log in to access the dashboard.");
    }
  };

  return (
    <div className="home-container">
      
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="nav-logo">Helix</h2>
        <div className="nav-links">
          <button onClick={() => navigate("/signup")}>Signup</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>

      <div className="heading">
        <h1>Welcome to the Home Page</h1>
        {user && <h2>Hello, {user.username}!</h2>} {/* Show username after login */}
        <div className="card-container">
            <div className="card" onClick={handleCardClick}>
            <h2>Helix</h2>
            <p>Click to explore the Helix dashboard.</p>
            </div>
            <div className="card" onClick={handleCardClick}>
            <h2>Pulse</h2>
            <p>Click to explore the Pulse dashboard.</p>
            </div>
            <div className="card" onClick={handleCardClick}>
            <h2>Nexus</h2>
            <p>Click to explore the Nexus dashboard.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
