
import {useState} from "react"

const First = ({setLanguage}) => {
    return (
        <div>
            <button onClick={() => setLanguage("English")} > Change language </button>
        </div>
    )
}

const Second = ({language}) => {
    return (
        <div>
            {language}
        </div>
    )
}

export default function App () {
    const [language, setLanguage] = useState("Test")
    return (
        <div>
        <First setLanguage={setLanguage}/>
        <Second language={language}/>
        </div>
    )
}