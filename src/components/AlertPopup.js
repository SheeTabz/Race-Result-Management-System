import React from 'react';

const AlertPopup = ({ event,message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-popup">
        <h3>{event}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AlertPopup;
