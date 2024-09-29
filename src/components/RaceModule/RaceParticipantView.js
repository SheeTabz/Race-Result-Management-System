import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const RaceParticipantView = ({participants}) => {
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
                {participants.length > 0 ? (
                  participants.map((participant, index) => (
                    <tr key={index}>
                      <td>{participant.id}</td>
                      <td>{participant.name}</td>
                      <td>{participant.lane}</td>
                      <td className='px-2'>
                        <button className="icon-btn">
                          <FaEdit className="edit-icon" />
                        </button>
                  
                        <button  className="icon-btn">
                          <FaTrashAlt className="delete-icon" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No participants added yet.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <button className="add-participant-btn" >
              Add Participant
            </button>
        </div>
    );
}

export default RaceParticipantView;
