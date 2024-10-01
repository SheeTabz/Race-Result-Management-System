import React, { useState } from 'react';
import AlertPopup from '../AlertPopup';

const RaceAddForm = ({ closePopup, addRace }) => {
  const [raceDetails, setRaceDetails] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  // States to manage the close and open of alert messages 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRaceDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle submission of a new race 
  const handleSubmit = (e) => {
    e.preventDefault();
    
        // Validation logic for start date and end date 
        const startDate = new Date(raceDetails.startDate);
        const endDate = new Date(raceDetails.endDate)
 
        if (startDate > endDate) {
         setAlertMessage('Start date cannot be greater than the end date.');
         setShowAlert(true);
            return;
        }
 
        if (endDate < startDate) {
         setAlertMessage('End date cannot be earlier than the start date.');
         setShowAlert(true);
            return;
        }
 
        // Clear any error messages
        setAlertMessage('');
// Function to add the new race event
    addRace(raceDetails); 
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Add New Race Event</h3>
        {showAlert && (
        <AlertPopup
        event="Failed"
          message={alertMessage}
          onClose={() => setShowAlert(false)} 
        />
      )}
        <form onSubmit={handleSubmit} className="race-form">
          <div className="form-group">
            <label htmlFor="title">Race Title</label>
            <input
            id="title"
              type="text"
              name="title"
              value={raceDetails.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
            id="startDate"
              type="date"
              name="startDate"
              value={raceDetails.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
            id="endDate"
              type="date"
              name="endDate"
              value={raceDetails.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
            id="description"
              name="description"
              value={raceDetails.description}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="close-btn" onClick={closePopup}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default RaceAddForm;
