import React, { useState } from 'react';
import '../styles/HospitalForm.css';

const HospitalForm = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [productAgent, setProductAgent] = useState('');
  const [doctors, setDoctors] = useState([
    { name: '', experience: '', specialty: '', description: '', gender: '' }
  ]);
  const [acknowledgment, setAcknowledgment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDoctorChange = (index, field, value) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index][field] = value;
    setDoctors(updatedDoctors);
  };

  const addDoctorForm = () => {
    setDoctors([...doctors, { name: '', experience: '', specialty: '', description: '', gender: '' }]);
  };

  const removeDoctorForm = (index) => {
    if (doctors.length > 1) {
      const updatedDoctors = doctors.filter((_, i) => i !== index);
      setDoctors(updatedDoctors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const phoneArray = phoneNumbers.split(',').map(num => num.trim());

    const hospitalData = {
      hospitalName,
      address,
      phoneNumbers: phoneArray,
      productAgent,
      doctors
    };

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('http://localhost:5000/api/hospitals', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(hospitalData)
      });
      
      const result = await res.json();
      if (res.ok) {
        setAcknowledgment({ message: "Hospital details saved successfully!", type: 'success' });
        // Reset form
        setHospitalName('');
        setAddress('');
        setPhoneNumbers('');
        setProductAgent('');
        setDoctors([{ name: '', experience: '', specialty: '', description: '', gender: '' }]);
      } else {
        setAcknowledgment({ message: `Error: ${result.error || "Failed to save details"}`, type: 'error' });
      }
    } catch (err) {
      setAcknowledgment({ message: `Network error: ${err.message}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hospital-form-container">
      <div className="form-header">
        <h2>Hospital Registration</h2>
        <p style={{color:"black"}}>Please fill in the details below to register your hospital</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="section-title">Hospital Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Hospital Name *</label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="Enter hospital name"
                required
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full address"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Numbers *</label>
              <input
                type="text"
                value={phoneNumbers}
                onChange={(e) => setPhoneNumbers(e.target.value)}
                placeholder="Comma separated numbers (e.g., 1234567890, 9876543210)"
                required
              />
            </div>

            <div className="form-group">
              <label>Product Agent *</label>
              <select
                value={productAgent}
                onChange={(e) => setProductAgent(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="voice">Voice</option>
                <option value="chatbot">Chat Bot</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Doctor Details</h3>
            <button 
              type="button" 
              className="add-doctor-btn"
              onClick={addDoctorForm}
            >
              + Add Doctor
            </button>
          </div>
          
          {doctors.map((doctor, index) => (
            <div key={index} className="doctor-form">
              <div className="doctor-header">
                <h4>Doctor #{index + 1}</h4>
                {doctors.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-doctor-btn"
                    onClick={() => removeDoctorForm(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={doctor.name}
                    onChange={(e) => handleDoctorChange(index, 'name', e.target.value)}
                    placeholder="Dr. Firstname Lastname"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Experience *</label>
                  <input
                    type="text"
                    value={doctor.experience}
                    onChange={(e) => handleDoctorChange(index, 'experience', e.target.value)}
                    placeholder="Years of experience"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Specialty *</label>
                  <input
                    type="text"
                    value={doctor.specialty}
                    onChange={(e) => handleDoctorChange(index, 'specialty', e.target.value)}
                    placeholder="Medical specialty"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    value={doctor.gender}
                    onChange={(e) => handleDoctorChange(index, 'gender', e.target.value)}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group full-width">
                  <label>Professional Description *</label>
                  <textarea
                    value={doctor.description}
                    onChange={(e) => handleDoctorChange(index, 'description', e.target.value)}
                    placeholder="Brief professional description"
                    rows="3"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save All Details'}
          </button>
        </div>
      </form>
      
      {acknowledgment && (
        <div className={`acknowledgment ${acknowledgment.type}`}>
          {acknowledgment.message}
        </div>
      )}
    </div>
  );
};

export default HospitalForm;