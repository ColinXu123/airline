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
    <div>
      <h1>Languages Page</h1>
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
