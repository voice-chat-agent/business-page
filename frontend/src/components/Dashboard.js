import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

// Import images from the same folder
import RestaurantImg from './images/resturant.jpg';
import HospitalImg from './images/Hospital.jpg';
import SalonImg from './images/Salon.jpg';
import PoliceImg from './images/image.jpg';
import RandomImg from './images/image.jpg';
// import ParkImg from './images/park.jpg';

// Reusable Card Component
const Card = ({ title, image, page }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(page)}>
      <img src={image} alt={title} className="card-image" />
      <h3>{title}</h3>
    </div>
  );
};

const Dashboard = ({ token }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setDashboardData(data);
        } else {
          setError(data.error || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Server error');
      }
    };

    if (token) fetchDashboard();
  }, [token]);

  if (!token) return <p className="error-text">Access Denied. Please log in.</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!dashboardData) return <p>Loading dashboard...</p>;

  // Card Data with different names, images, and pages
  const cardData = [
    { title: "Restaurant", image: RestaurantImg, page: "/restaurant" },
    { title: "Hospital", image: HospitalImg, page: "/hospital" },
    { title: "Salon", image: SalonImg, page: "/salon" },
    { title: "Police", image: PoliceImg, page: "/police" },
    { title: "Random Image", image: RandomImg, page: "/random" },
    // { title: "Park", image: ParkImg, page: "/park" }
  ];

  return (
    <div className="dashboard-container">
      {/* User Info Section */}
      {dashboardData.user && (
        <div className="user-info">
          <h2>Welcome, {dashboardData.user.username}!</h2>
        </div>
      )}

      {/* Centered Card Grid Layout */}
      <div className="grid-wrapper">
        <div className="grid-container">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title} image={card.image} page={card.page} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;