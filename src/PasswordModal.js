import React, { useState } from 'react';

const PasswordModal = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you can validate the entered password
    if (password === '12345') {  // Example password
      onSubmit(password); // Call onSubmit with the entered password
      onClose(); // Close the modal if the password is correct
    } else {
      setError('Incorrect password. Please try again.'); // Display error message
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3>Please enter your password</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={inputStyle}
            required
          />
          {error && <p style={errorStyle}>{error}</p>} {/* Show error if password is incorrect */}
          <div style={buttonContainerStyle}>
            <button type="submit" style={buttonStyle}>Submit</button>
            <button type="button" onClick={onClose} style={closeButtonStyle}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '20px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const closeButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  fontSize: '14px',
};

export default PasswordModal;