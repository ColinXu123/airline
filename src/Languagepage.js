import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';


function LanguagePage({setMyLanguage}) {
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate(); // Initialize the navigate function
    

  // Fetch requests on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/get-languages')
      .then(response => {
        setLanguages(response.data.translations);
      })
      .then()
      .catch(error => {
        console.error('There was an error fetching the requests!', error);
      });
  }, []);

  const selectedLanguage = (lang) => {
    let send = {
      language : lang
    }

    setMyLanguage(lang)
    
    axios({
      method: "post",
      url:"http://localhost:3001/choose-lang",
      data : send
    }).then()
        navigate("/Mainpage" , { state: lang })
  }
    

  return (
    <div
        style={{
            fontFamily: 'Arial, sans-serif',
            backgroundImage: "url('languagechoosehackathon2025.jpg')",
            backgroundSize: 'cover', // Ensures the image covers the entire div
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat', // Prevents tiling
            color: '#333',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Full viewport height
        }}
    >
    <h1
    style={{
      backgroundColor: 'white',
      padding: '10px 20px',
      borderRadius: '8px', // Rounded corners
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for better aesthetics
      color: '#333', // Text color
    }}
    >Languages Page</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
        {Object.values(languages).map((item, index) => (
          <button onClick={() => selectedLanguage(item.language_button.name)} key={item.language_button.name} style={{ padding: "20px", fontSize: "16px" }}>
            {item.language_button.flag} {item.language_button.name}
          </button>
        ))}
      </div>
      </div>
  );
}

export default LanguagePage;
