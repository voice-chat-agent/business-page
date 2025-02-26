
import React, { useState } from 'react';
// import './HospitalForm.css'; // create and import your CSS file for styling

const HospitalForm = () => {
  // State for hospital details
  const [hospitalName, setHospitalName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [productAgent, setProductAgent] = useState('');
  
  // State for dynamic doctor details (each doctor is an object)
  const [doctors, setDoctors] = useState([
    { name: '', experience: '', specialty: '', description: '', gender: '' }
  ]);
  
  // Handle change for doctor fields
  const handleDoctorChange = (index, field, value) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index][field] = value;
    setDoctors(updatedDoctors);
  };

  // Add a new doctor form entry
  const addDoctorForm = () => {
    setDoctors([...doctors, { name: '', experience: '', specialty: '', description: '', gender: '' }]);
  };

  // Handle overall form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated phone numbers to an array
    const phoneArray = phoneNumbers.split(',').map(num => num.trim());

    // Prepare the complete data object
    const hospitalData = {
      hospitalName,
      address,
      phoneNumbers: phoneArray,
      productAgent,
      doctors
    };

    // Send the data to your backend API (ensure this endpoint handles the saving logic to MongoDB)
    try {
      const res = await fetch('http://localhost:5000/api/hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hospitalData)
      });
      const result = await res.json();
      if (res.ok) {
        // Optionally, handle success (e.g., notify the user, redirect, or reset the form)
        console.log("Data saved successfully", result);
      } else {
        console.error("Error saving data", result);
      }
    } catch (err) {
      console.error("Server error:", err);
    }
  };

  return (
    <div className="hospital-form-container">
      <h2>Hospital Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hospital Name:</label>
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Numbers (separated by comma):</label>
          <input
            type="text"
            value={phoneNumbers}
            onChange={(e) => setPhoneNumbers(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Agent:</label>
          <select
            value={productAgent}
            onChange={(e) => setProductAgent(e.target.value)}
            required
          >
            <option value="">Select Option</option>
            <option value="voice">Voice</option>
            <option value="chatbot">Chat Bot</option>
            <option value="both">Both</option>
          </select>
        </div>

        <hr />

        <h3>Doctor Details</h3>
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={doctor.name}
                onChange={(e) => handleDoctorChange(index, 'name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Experience:</label>
              <input
                type="text"
                value={doctor.experience}
                onChange={(e) => handleDoctorChange(index, 'experience', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Specialty:</label>
              <input
                type="text"
                value={doctor.specialty}
                onChange={(e) => handleDoctorChange(index, 'specialty', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={doctor.description}
                onChange={(e) => handleDoctorChange(index, 'description', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                value={doctor.gender}
                onChange={(e) => handleDoctorChange(index, 'gender', e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <hr />
          </div>
        ))}

        <button type="button" onClick={addDoctorForm}>
          + Add Another Doctor
        </button>
        <br /><br />
        <button type="submit">Save Hospital & Doctor Details</button>
      </form>
    </div>
  );
};

export default HospitalForm;
