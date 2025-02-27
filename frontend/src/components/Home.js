import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Styling file
// import "../styles/Navbar.css"; // Styling file

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
      <div className="heading">
        <h3>Welcome to the Home Page</h3>
        {user && <h4>Hello, {user.username}!</h4>} {/* Show username after login */}
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
