import React, { useState } from 'react';

const RaceResultsView = ({participants}) => {
    const [results, setResults] = useState({}); 
    const handleResultChange = (id, value) => {
        setResults((prevResults) => ({
          ...prevResults,
          [id]: value, // Store the finishing place for the participant by ID
        }));
      };
    
      // Function to save results
      const saveResults = () => {
        // Ensure all results are filled and no duplicate positions
        const uniquePlaces = new Set(Object.values(results).map((result) => result.place));
        const allTimesEntered = Object.values(results).every((result) => result.time && result.place);
        
        if (Object.keys(results).length !== participants.length || uniquePlaces.size !== participants.length || !allTimesEntered) {
          alert("Please enter unique finishing places and valid times for all participants.");
        } else {
          alert("Results saved successfully!");
          // You can perform further actions here, like saving the results in local storage or state
        }
      };
    return (
        <div>
             <table className="participants-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Assigned Lane</th>
                  <th>Place (Position)</th>
                  <th>Time (Minutes:Seconds)</th>
                </tr>
              </thead>
              <tbody>
                {participants.length > 0 ? (
                  participants.map((participant, index) => (
                    <tr key={index}>
                      <td>{participant.id}</td>
                      <td>{participant.name}</td>
                      <td>{participant.lane}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          className="place-input"
                          value={results[participant.id] || ''}
                          onChange={(e) => handleResultChange(participant.id, e.target.value)}
                          placeholder="Enter Place"
                        />
                      </td>
                      <td>
                            <input
                          type="text"
                          pattern="[0-9]{2}:[0-9]{2}" // Basic validation for time format
                          className="time-input"
                          value={results[participant.id]?.time || ''}
                          onChange={(e) => handleResultChange(participant.id, 'time', e.target.value)}
                          placeholder="MM:SS"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No participants added yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="save-results-btn" onClick={saveResults}>
              Save Results
            </button>
        </div>
    );
}

export default RaceResultsView;
