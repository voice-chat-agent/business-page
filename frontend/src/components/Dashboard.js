import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable Card Component
const Card = ({ title, content, page }) => {
  const navigate = useNavigate();
  
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{content}</p>
      <button style={styles.button} onClick={() => navigate(page)}>Go to {title}</button>
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

  if (!token) return <p style={{ color: 'red' }}>Access Denied. Please log in.</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!dashboardData) return <p>Loading dashboard...</p>;

  return (
    <div style={styles.container}>
      {/* User Info Section (Not in a Card) */}
      {dashboardData.user && (
        <div style={styles.userInfo}>
          <h2>Welcome, {dashboardData.user.username}!</h2>
          {/* <p>Email: {dashboardData.user.email}</p>
          <p>Phone: {dashboardData.user.phone}</p>
          <p>Country: {dashboardData.user.country_address}</p> */}
        </div>
      )}

      {/* Card Grid Layout */}
      <div style={styles.gridContainer}>
        {Array.from({ length: 9 }, (_, index) => (
          <Card 
            key={index} 
            title={`Card ${index + 1}`} 
            content={`This is card number ${index + 1}`} 
            page={`/page${index + 1}`} // Redirects to different pages
          />
        ))}
      </div>
    </div>
  );
};

// Styles for Layout
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  userInfo: {
    textAlign: 'center',
    padding: '15px',
    borderBottom: '2px solid #ddd',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 cards per row
    gap: '20px',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    border: '2px solid #ddd',
    borderRadius: '10px',
    padding: '30px', // More padding for height
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    boxShadow: '3px 3px 15px rgba(0,0,0,0.2)',
    height: '250px', // Increased height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Dashboard;