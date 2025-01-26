import {useState} from 'react'
import App from './App';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import AdminPage from './Adminpage';
import LanguagePage from './Languagepage';


export default function AppRouter () {
    const [language, setLanguage] = useState("English")

    return (
        <Routes>
      <Route path="/Mainpage" element={<App  lang={language}/>} />
      <Route path="/Adminpage" element={<AdminPage/>} />
      <Route path="/" element={<LanguagePage setMyLanguage={setLanguage}/>} />

    </Routes>
    )
}