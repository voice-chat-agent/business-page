import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Login = ({ setToken, setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login_identifier: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('access_token', data.access_token);
        navigate('/'); // Redirect to Home instead of Dashboard
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="login_identifier"
            placeholder="Username, Email, or Phone"
            onChange={handleChange}
            required
          />
          <br />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        
        <p className="switch-link">
          Don't have an account? <Link to="/signup">Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
