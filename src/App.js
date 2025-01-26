import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './Adminpage';
import axios from 'axios';
import './App.css';
import PasswordModal from './PasswordModal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
const [accessGranted, setAccessGranted] = useState(false);
    let id_count = 0;
    const [helpTopic, setHelpTopic] = useState('');
    const [otherHelp, setOtherHelp] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const openModal = () => {
        setIsModalOpen(true); // Open the modal
      };
    
      // Function to close the modal
      const closeModal = () => {
        setIsModalOpen(false); // Close the modal
      };
    
      // Handle password submission and grant access
      const handlePasswordSubmit = (enteredPassword) => {
        setAccessGranted(true);
            navigate('/Adminpage');
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        
        let message = `${helpTopic}`;


        if (helpTopic === 'other') {
            message = `${otherHelp}`;
        }
        let request = {
            id :id_count++,
            name : message,
            seat_num : contactInfo,
        }
        handleSave(request);

        setHelpTopic('');
        setOtherHelp('');
        setContactInfo('');
    };

        const navigate = useNavigate(); // Initialize the navigate function
      
        // Function to handle button click and navigate to another page
       const handleButtonClick = () => {
        navigate('/Adminpage'); // Navigate to the About page
       };
   
       function handleSave(helpitem) {
        axios({
          method: 'post',
          url: 'http://localhost:3001/save-request',
          data: helpitem
        })
      }  

    
    return (
        
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f9',
            color: '#333',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '20px',
            }}>

                
                <button style={{ fontSize: '1.0rem', textAlign: 'top', marginBottom: '5px' }}  onClick = {openModal} >Admin MODE</button>
                <h1 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px' }}>Airport Help Ticket</h1>
                {isModalOpen && (
        <PasswordModal
          onClose={closeModal}
          onSubmit={handlePasswordSubmit} // Pass the function that handles the password
        />
      )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="helpTopic" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                        What do you need help with?
                    </label>
                    <select
                        id="helpTopic"
                        name="helpTopic"
                        value={helpTopic}
                        onChange={(e) => setHelpTopic(e.target.value)}
                        style={{
                            width: '100%',
                            marginBottom: '15px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '1rem',
                        }}
                        required
                    >
                        <option value="">-- Please Select --</option>
                        <option value="baggage">Baggage Assistance</option>
                        <option value="boarding">Boarding Information</option>
                        <option value="security">Security Check</option>
                        <option value="other">Other</option>
                    </select>
                    
                    {helpTopic === 'other' && (
                        <div>
                            <label htmlFor="otherHelp" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                                Please specify your issue
                            </label>
                            <textarea
                                id="otherHelp"
                                name="otherHelp"
                                rows="4"
                                value={otherHelp}
                                onChange={(e) => setOtherHelp(e.target.value)}
                                placeholder="Describe your issue..."
                                style={{
                                    width: '100%',
                                    marginBottom: '15px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                }}
                            ></textarea>
                        </div>
                    )}

                    <label htmlFor="contactInfo" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                        Your Contact Information
                    </label>
                    <input
                        type="text"
                        id="contactInfo"
                        name="contactInfo"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="Seat Number"
                        required
                    />
                         
                    
                    <button
                        type="submit" className = "submit"
                    >
                        Submit Ticket
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
