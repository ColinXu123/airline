//Backend for our application:
//This needs to be constantly running in order for the front-end to work
//To start the backend locally, run "node app.js" in the terminal
//In order to make this available "publicly", you will need to deploy it to a server
//Don't worry! It's easier than it sounds.
//If you want an easy way to deploy this, check out Heroku (https://www.heroku.com/)

//Imports
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import { GoogleGenerativeAI } from "@google/generative-ai";

//Set up Express App for use
//Line 12-13 set up the CORS policy and the request body parser (don't worry about this, it scares me too)
const app = express()
const port = 3001
app.use(cors())
app.use(express.json());

// Use JSON file for storage
//Where I got this: https://github.com/typicode/lowdb
const file = './db.json' 
const adapter = new JSONFile(file)
const db = new Low(adapter, adapter)

const languages_file = './languages.json' 
const adapter1 = new JSONFile(languages_file)
const lang = new Low(adapter1, adapter1)

const chosen_language_file = './language.json' 
const adapter2 = new JSONFile(chosen_language_file)
const chosen_lang = new Low(adapter2, adapter2)

//Reads db.json file
//If it does not exist, it is created, and an empty jokes array is inserted.
//If it does exist, do nothing. db.data will be ready for use.
//Where I got this: https://github.com/typicode/lowdb
await db.read()
db.data ||= { jokes: [] } 
await db.write()

await chosen_lang.read()
chosen_lang.data = { chosen_language: "" } 
await chosen_lang.write()
/*
SAVE JOKE POST REQUEST
Front-end will make a POST request to the app at this endpoint
When that happens, this code will run!
We want this section to:
  - Update the jokes array in our database
  - Respond with a successful status code (200)
*/
app.post('/save-request', async (req, res) => {
  console.log("POST endpoint hit!")

  await db.read();
  const { requests } = db.data;
  let newID = 1
  if(requests.length != 0){
    let newID = requests[requests.length-1].key+1;

  }

  let request = {
    key: newID,
    name: req.body.name,
    seat_num: req.body.seat_num,
    complete: false,
  };

  
  requests.push(request);
  await db.write();
})

/*
JOKES GET REQUEST
Front-end will make a GET request to the app at this endpoint
When that happens, this code will run!
We want this section to:
  - Make a GET request to the Jokes API and retrieve a joke 
  - Respond with a successful status code (200)
*/
app.get('/', (req, res) => {
  console.log("GET endpoint hit!")
  axios({
    method: 'get',
    url: 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit',
  })
  .then(function (response) {
    res.send(response.data)
  });
})

app.get('/get-text', (req, res) =>{
  console.log("Setting up website text...")
})

app.get('/get-languages' , async (req, res ) =>{
  console.log("Select a language...");
  await lang.read();
  const languages = lang.data
  res.send(languages)
})

app.post('/choose-lang', async (req, res) =>{
  await chosen_lang.read();
  chosen_lang.data = {
    chosen_language : req.body.language
  }
  await chosen_lang.write();
})

app.get('/get-chosen-lang' , async (req, res ) => {
  await chosen_lang.read();
  const language = chosen_lang.data
  console.log(language)
  res.send(language);
})

app.get('/get-requests', async (req, res) => {
  console.log("GET endpoint hit!")
  await db.read();
  const { requests } = db.data;
  console.log(requests)
  res.send(requests);
})

app.post('/delete-request', async (req, res) => {
  console.log("Deleting " + req.body.delete);

  // Read the database to get the current data
  await db.read();

  // Get the 'requests' array from the database
  const { requests } = db.data;

  // Assuming you're passing an ID or identifier in the request body to specify which request to delete
  const id = req.body.delete;  // You may change this based on your data structure
  if (!id) {
    return res.status(400).send({ message: 'Request ID is required' });
  }

  // Find the index of the request to delete
  const requestIndex = requests.findIndex((request) => request.key === id);
  console.log(requestIndex)
  if (requestIndex === -1) {
    return res.status(404).send({ message: 'Request not found' });
  }

  // Remove the request from the array
  requests.splice(requestIndex, 1);

  // Write the updated data back to the db
  await db.write();

  // Respond with success
  res.status(200).send({ message: 'Request deleted successfully' });
});


//Start the app on the specified port. Any request to the app should be made to localhost:{port}
//This part is standard on almost every Express app!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



async function translate(text, target_language){
  const genAI = new GoogleGenerativeAI("AIzaSyDcqZcLpDJtWA1O5GXOm3A2kIoqsFP3bHs");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Only put output the answer to the following question: Translate ${text} to ${target_language}`;

  return await model.generateContent(prompt);
  
}
