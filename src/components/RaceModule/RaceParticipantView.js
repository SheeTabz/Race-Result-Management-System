import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addParticipant, updateParticipant, deleteParticipant } from '../../redux/raceActions';
import {getRacesFromLocalStorage } from '../utils/localStorageUtils';

const RaceParticipants = ({ raceId }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState({ id: '', name: '', lane: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [students, setStudents] = useState([]);
  const races = getRacesFromLocalStorage();
  const race = races.find((r) => r.id === raceId);

  // Fetch students from local storage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  const openPopup = () => {
    setSelectedParticipant({ id: '', name: '', lane: '', active: true  });
    setIsEditing(false);
    setShowPopup(true);
  };

  const openEditPopup = (participant) => {
    setSelectedParticipant(participant);
    setIsEditing(true);
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedParticipant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedParticipants = [];

    if (isEditing) {
      // Update participant
      updatedParticipants = race.participants.map((participant) => 
        participant.id === selectedParticipant.id ? selectedParticipant : participant
      );
      dispatch(updateParticipant(raceId, selectedParticipant.id, selectedParticipant));
    } else {
      // Add new participant
      const newParticipant = { ...selectedParticipant, id: Date.now().toString() }; 
      updatedParticipants = [...race.participants, newParticipant];
      dispatch(addParticipant(raceId, newParticipant));
    }

    // Update the race object
    const updatedRace = { ...race, participants: updatedParticipants };

    // Save updated race to local storage
    const updatedRaces = races.map((r) => (r.id === raceId ? updatedRace : r));
    localStorage.setItem('races', JSON.stringify(updatedRaces));

    setShowPopup(false);
  };

  const handleDelete = (participantId) => {
    setSelectedParticipant({ ...selectedParticipant, id: participantId });
    setShowConfirmDeletePopup(true);
  };

  const confirmDelete = () => {
    const updatedParticipants = race.participants.filter((p) => p.id !== selectedParticipant.id);
    const updatedRace = { ...race, participants: updatedParticipants };
    
    // Update the local storage with the modified races array
    const updatedRaces = races.map((r) => (r.id === raceId ? updatedRace : r));
    localStorage.setItem('races', JSON.stringify(updatedRaces));

    dispatch(deleteParticipant(raceId, selectedParticipant.id));
    setShowConfirmDeletePopup(false);
  };

  const cancelDelete = () => {
    setShowConfirmDeletePopup(false);
  };

  const getAvailableStudents = () => {
    const assignedStudentNames = race.participants.map((p) => p.name);
    return students.filter((student) => !assignedStudentNames.includes(student.name));
  };

  const getAvailableLanes = () => {
    const assignedLanes = race.participants.map((p) => p.lane);
    const allLanes = Array.from({ length: 8 }, (_, i) => `Lane ${i + 1}`);
    return allLanes.filter((lane) => !assignedLanes.includes(lane));
  };

  return (
    <div>
    
      <table className="participants-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Assigned Lane</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {race.participants?.length > 0 ? (
            race.participants.map((participant, index) => (
              <tr key={participant.id}>
                <td>{index + 1}</td>
                <td>{participant.name}</td>
                <td>{participant.lane}</td>
                <td className='px-2'>
                  <button className="icon-btn" data-testid="edit-button"  onClick={() => openEditPopup(participant)}>
                    <FaEdit className="edit-icon" />
                  </button>
                  <button className="icon-btn" data-testid="delete-button"  onClick={() => handleDelete(participant.id)}>
                    <FaTrashAlt className="delete-icon" />
                  </button>
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
      <button className="add-participant-btn" onClick={openPopup}>
        <FaPlus /> Add Participant
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{isEditing ? 'Edit Participant' : 'Create Participant'}</h3>
            <form onSubmit={handleSubmit} className="participant-form">
              <div className="form-group">
                <label htmlFor="name">Select Participant</label>
                <select
                id="name"
                  name="name"
                  value={selectedParticipant.name}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select a student --</option>
                  {getAvailableStudents().map((student) => (
                   !student.inactive && <option key={student.id} value={student.name}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="lane">Assigned Lane</label>
                <select
                id="lane"
                  name="lane"
                  value={selectedParticipant.lane}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select a lane --</option>
                  {getAvailableLanes().map((lane) => (
                    <option key={lane} value={lane}>
                      {lane}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-btn">
                {isEditing ? 'Update Participant' : 'Create Participant'}
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Delete Popup */}
      {showConfirmDeletePopup && (
        <div className="confirmation-popup">
          <div className="confirmation-popup-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this participant?</p>
            <button data-testid="confirm-button"  className="confirm-btn" onClick={confirmDelete}>Confirm</button>
            <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaceParticipants;
