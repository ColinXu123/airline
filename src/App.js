import React, {useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import axios from 'axios';
import './App.css';
import PasswordModal from './PasswordModal';

function App({lang}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accessGranted, setAccessGranted] = useState(false);
    const [helpTopic, setHelpTopic] = useState('');
    const [otherHelp, setOtherHelp] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function
    const [language, setLanguage] = useState({
        "title": "Airport Help Ticket",
        "help_prompt": "What do you need help with?",
        "options": ["please select", "baggage assistance", "boarding assistance", "security check", "other"],
        "other_prompt": "please specify",
        "contact_info": "Your contact information",
        "seat_number": "seat number",
        "submit": "submit ticket",
        "language_button": {
            "name": "English",
            "flag": "🇬🇧"
          }
      });

      const{state} = useNavigate();
      //const [loading, setLoading] 
      const ForceRefresh = () => {
        const hasReloaded = useRef(false);
        useEffect(() => {
            if (!hasReloaded.current) {
                hasReloaded.current = true; // Set the ref to true
                window.location.reload(); // Refresh the page
            }
        }, []); // Empty dependency array to run once on mount
    }
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
            name : message,
            seat_num : contactInfo,
        }
        handleSave(request);

        setHelpTopic('');
        setOtherHelp('');
        setContactInfo('');
    };

      
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

        useLayoutEffect(()=>{
            axios.get("http://localhost:3001/get-chosen-lang")
                .then(response => {
                    let chosen_language = response.data.chosen_language

                    if(chosen_language ==''){
                        navigate('/Mainpage')
                    }else{
                        axios.get("http://localhost:3001/get-languages")
                        .then(response2 =>{
                            let translations = response2.data.translations
                            console.log(state)
                            setLanguage(translations[ state || lang ])
                            console.log(response)
                        })
                    }

                })
        },[state]);
    return (
        
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                backgroundImage: "url('americanairlineshome.jpg')",
                backgroundSize: 'cover', // Ensures the image covers the entire div
                backgroundPosition: 'center', // Centers the image
                backgroundRepeat: 'no-repeat', // Prevents tiling
                color: '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full viewport height
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
                <h1 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px' }}>{language.title}</h1>
                {isModalOpen && (
        <PasswordModal
          onClose={closeModal}
          onSubmit={handlePasswordSubmit} // Pass the function that handles the password
        />
      )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="helpTopic" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                        {language.help_prompt}
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
                        <option value="">{language.options[0]}</option>
                        <option value="baggage">{language.options[1]}</option>
                        <option value="boarding">{language.options[2]}</option>
                        <option value="security">{language.options[3]}</option>
                        <option value="other">{language.options[4]}</option>
                    </select>
                    
                    {helpTopic === 'other' && (
                        <div>
                            <label htmlFor="otherHelp" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                                {language.other_prompt}
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
                        {language.contact_info}
                    </label>
                    <input
                        type="text"
                        id="contactInfo"
                        name="contactInfo"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder={language.seat_number}
                        required
                    />
                         
                    
                    <button
                       
                        type="submit" className = "submit"
                    >
                        {language.submit}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;

