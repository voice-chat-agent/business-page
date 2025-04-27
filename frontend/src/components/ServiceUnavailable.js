import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceUnavailable.css';

const ServiceUnavailable = () => {
  const navigate = useNavigate();

  return (
    <div className="service-unavailable-container">
      <div className="service-unavailable-content">
        <div className="service-unavailable-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <h1>Currently Service Unavailable</h1>
        <p>Currently working on this feature. Please check back later.</p>
        
        <div className="service-unavailable-actions">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
          >
            Go Back
          </button>
          {/* <button 
            onClick={() => navigate('/')} 
            className="home-button"
          >
            Return Home
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceUnavailable;