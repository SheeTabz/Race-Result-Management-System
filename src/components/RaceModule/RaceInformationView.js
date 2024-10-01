import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRace } from '../../redux/raceActions';
import { saveRacesToLocalStorage } from '../utils/localStorageUtils';
import AlertPopup from '../AlertPopup';

const RaceInformationView = ({ raceDetails }) => {
    const dispatch = useDispatch();
    const [updatedRace, setUpdatedRace] = useState(raceDetails);
    // State for the update message pop-up
    const [showUpdateMessage, setShowUpdateMessage] = useState(false); 
    const [showAlert, setShowAlert] = useState(false);
    // State to manage Message for the alert
  const [alertMessage, setAlertMessage] = useState(''); 

    // Get the current races from Redux state
    const races = useSelector((state) => state.raceState.races);
// Handle the form input changes 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRace({
            ...updatedRace,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
       // Validation logic for start date and end date
       const startDate = new Date(updatedRace.startDate);
       const endDate = new Date(updatedRace.endDate);

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

        // Update race in the current races list
        const updatedRaceList = races.map((race) =>
            race.id === updatedRace.id ? updatedRace : race
        );

        // Dispatch the updated race list to Redux
        dispatch(updateRace(updatedRace));

        // Save the updated race list to local storage
        saveRacesToLocalStorage(updatedRaceList);

        // Show update success message
        setShowUpdateMessage(true);

        // Hide the message after 3 seconds
        setTimeout(() => setShowUpdateMessage(false), 3000);
    };

    return (
        <div>
             {showAlert && (
        <AlertPopup
        event="Failed"
          message={alertMessage}
          onClose={() => setShowAlert(false)} 
        />
      )}
            {/* Pop-up message at the top */}
            {showUpdateMessage && (
                <div className="update-message">
                    Updated successfully!
                </div>
            )}

            <form className='input-form' onSubmit={handleSubmit}>
                <div className="w-full flex-1">
                    <label htmlFor='title' className="input-label">Race Title</label>
                    <div className="input-wrapper">
                        <input
                        id='title'
                            name="title"
                            placeholder="Provide title"
                            className="input"
                            value={updatedRace.title}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="w-full flex-1">
                    <label htmlFor='startDate' className="input-label">Start Date</label>
                    <div className="input-wrapper">
                        <input
                        id='startDate'
                            type='date'
                            name="startDate"
                            className="input"
                            value={updatedRace.startDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="w-full flex-1">
                    <label htmlFor="endDate" className="input-label">End Date</label>
                    <div className="input-wrapper">
                        <input
                        id="endDate"
                            type='date'
                            name="endDate"
                            className="input"
                            value={updatedRace.endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="w-full flex-1">
                    <label htmlFor='description' className="input-label">Description</label>
                    <div className="input-wrapper">
                        <textarea
                        id='description'
                            name="description"
                            placeholder="Description"
                            rows={4}
                            className="input"
                            value={updatedRace.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
                <button type='submit' className="mt-2 w-full appearance-none p-1 px-2 text-white outline-none bg-blue-800">Edit</button>
            </form>
        </div>
    );
};

export default RaceInformationView;
