import React, { useState, useEffect } from 'react';
import { getRacesFromLocalStorage } from '../utils/localStorageUtils';
import AlertPopup from '../AlertPopup'; 

const RaceResultsView = ({ raceId }) => {
  const [participants, setParticipants] = useState([]);
  const [results, setResults] = useState([]);
  // store the race start date
  const [raceStartDate, setRaceStartDate] = useState(null); 
  // control alert visibility
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 

  // Fetch participants from the current race
  useEffect(() => {
    const races = getRacesFromLocalStorage();
    const currentRace = races.find((race) => race.id === raceId);
    if (currentRace) {
      setParticipants(currentRace.participants);
      setRaceStartDate(new Date(currentRace.startDate)); 
      // Initialize results state with existing values
      // Populate existing position if available
      // Populate existing time if available
      const initialResults = {};
      currentRace.participants.forEach((participant) => {
        initialResults[participant.id] = {
          place: participant.place || '', 
          time: participant.time || { hours: '', minutes: '', seconds: '' }, 
        };
      });
      setResults(initialResults);
    }
  }, [raceId]);

  const handleResultChange = (id, field, value) => {
    setResults((prevResults) => ({
      ...prevResults,
      [id]: {
        ...prevResults[id],
        [field]: value,
      },
    }));
  };

  const saveResults = () => {
    const currentDate = new Date(); 

    // Check if the race start date is in the future
    if (currentDate < raceStartDate) {
        setAlertMessage("You cannot record results for races that have not started yet.");
        setShowAlert(true); 
        return;
    }

    const uniquePlaces = new Set(Object.values(results).map((result) => result.place));
    const allResultsEntered = Object.values(results).every(
        (result) => result.time.hours && result.time.minutes && result.time.seconds && result.place
    );

    if (Object.keys(results).length !== participants.length || uniquePlaces.size !== participants.length || !allResultsEntered) {
        setAlertMessage("Please enter unique finishing places and valid times for all participants.");
        setShowAlert(true); 
    } else {
        // alert("Results saved successfully!");

        // Update the race results in local storage
        const races = getRacesFromLocalStorage();

        const updatedRaces = races.map((race) => {
            if (race.id === raceId) {
                const updatedParticipants = race.participants.map((participant) => {
                    return {
                        ...participant,
                        place: results[participant.id]?.place || participant.place, 
                        time: {
                            hours: parseInt(results[participant.id]?.time.hours, 10) || participant.time.hours,
                            minutes: parseInt(results[participant.id]?.time.minutes, 10) || participant.time.minutes,
                            seconds: parseInt(results[participant.id]?.time.seconds, 10) || participant.time.seconds,
                        },
                    };
                });

                return {
                    ...race,
                    participants: updatedParticipants, 
                };
            }
            return race;
        });

        // Save updated races to localStorage
        localStorage.setItem('races', JSON.stringify(updatedRaces));
    }
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
      {/* <h3>Race Results</h3> */}
      <table className="participants-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Assigned Lane</th>
            <th>Place (Position)</th>
            <th>Time (HH:MM:SS)</th>
          </tr>
        </thead>
        <tbody>
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <tr key={participant.id}>
                <td>{index + 1}</td>
                <td>{participant.name}</td>
                <td>{participant.lane}</td>
                <td>
                  <input
                  data-testid="position"
                    type="number"
                    min="1"
                    className="place-input"
                    value={results[participant.id]?.place || ''}
                    onChange={(e) => handleResultChange(participant.id, 'place', e.target.value)}
                    placeholder="Enter Place"
                  />
                </td>
                <td>
                  <div className="time-inputs">
                    <input
                    data-testid="hours"
                      type="number"
                      min="0"
                      max="99"
                      className="time-input"
                      value={results[participant.id]?.time.hours || ''}
                      onChange={(e) => handleResultChange(participant.id, 'time', { ...results[participant.id]?.time, hours: e.target.value })}
                      placeholder="HH"
                    />
                    <span>:</span>
                    <input
                    data-testid="minutes"
                      type="number"
                      min="0"
                      max="59"
                      className="time-input"
                      value={results[participant.id]?.time.minutes || ''}
                      onChange={(e) => handleResultChange(participant.id, 'time', { ...results[participant.id]?.time, minutes: e.target.value })}
                      placeholder="MM"
                    />
                    <span>:</span>
                    <input
                    data-testid="seconds"
                      type="number"
                      min="0"
                      max="59"
                      className="time-input"
                      value={results[participant.id]?.time.seconds || ''}
                      onChange={(e) => handleResultChange(participant.id, 'time', { ...results[participant.id]?.time, seconds: e.target.value })}
                      placeholder="SS"
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No participants added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="save-results-btn" onClick={saveResults}>
        Save Results
      </button>
    </div>
  );
};

export default RaceResultsView;
