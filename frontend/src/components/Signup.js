import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    country_address: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="auth-container">
        <div className="auth-box1">
          <h2 className="bold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input className="class1" name="username" placeholder="Username" onChange={handleChange} required />
            <br />
            <input className="class1" name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <br />
            <input className="class1" name="phone" placeholder="Phone" onChange={handleChange} required />
            <br />
            <input className="class1" name="country_address" placeholder="Country Address" onChange={handleChange} required />
            <br />
            <input className="class1" name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <br />
            <button type="submit" className="bold">Sign Up</button>
          </form>
          {error && <p className="error">{error}</p>}
          
          <p className="switch-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
    </div>
  );
};

export default Signup;