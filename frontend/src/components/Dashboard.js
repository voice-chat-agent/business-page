import React, { useEffect, useState } from 'react';

const Dashboard = ({ token }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
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
    fetchDashboard();
  }, [token]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!dashboardData) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{dashboardData.message}</p>
      <div>
        <h3>User Info</h3>
        <p>Username: {dashboardData.user.username}</p>
        <p>Email: {dashboardData.user.email}</p>
        <p>Phone: {dashboardData.user.phone}</p>
        <p>Country: {dashboardData.user.country_address}</p>
      </div>
    </div>
  );
};

export default Dashboard;
