import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Import images
import RestaurantImg from './images/resturant.jpg';
import HospitalImg from './images/Hospital.jpg';
import SalonImg from './images/Salon.jpg';

// Reusable Card Component
const Card = ({ title, image, page }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Define action points based on card type
  const getActionPoints = () => {
    switch (title) {
      case "Hospital":
        return ["Services Included:","• Doctor Lookup", "• Doctor Recommendation based on symptoms","• Appointment Booking and Cancelation"];
      case "Restaurant":
        return ["Services Included:","• Cuisine search","• Table Booking", "• Order Booking and cancellation"];
      case "Salon":
        return ["Services Included:","• Slot booking", "• Inquiry of plans","• Detail description of services"];
      default:
        return [];
    }
  };

  return (
    <div 
      className="card1" 
      onClick={() => navigate(page)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={title} className="card-image1" />
      <div className={`card-overlay1 ${isHovered ? 'active' : ''}`}>
        <h3 className="card-title1">{title}</h3>
        <div className="card-actions1">
          {getActionPoints().map((action, index) => (
            <span key={index}>{action}</span>
          ))}
        </div>
      </div>
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

  if (!token) return <p className="error-text1">Access Denied. Please log in.</p>;
  if (error) return <p className="error-text1">{error}</p>;
  if (!dashboardData) return <p className="loading-text1">Loading dashboard...</p>;

  const cardData = [
    { title: "Hospital", image: HospitalImg, page: "/hospital" },
    { title: "Restaurant", image: RestaurantImg, page: "/restaurant" },
    { title: "Salon", image: SalonImg, page: "/restaurant" },
  ];

  return (
    <div className="dashboard-container1">
      {dashboardData.user && (
        <div className="user-info1">
          <h2>Welcome, <span className="username1">{dashboardData.user.username}</span>!</h2>
          <h3 className="h3heading">Select Your Business</h3>
        </div>
      )}

      <div className="grid-wrapper1">
        <div className="grid-container1">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title} image={card.image} page={card.page} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;