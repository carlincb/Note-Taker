// Defining variables to bring in required packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Defining the port we want the server to run on
const PORT = process.env.PORT || 3001;

// Defining variable so that express can be used
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Helper function to read db file
async function readDatabase () {
    const db = await fs.promises.readFile('./db/db.json');
    return db;
};

// GET route to read and return data from db.json file
app.get('/api/notes', (req, res) => {
    console.log('Hit /api/notes route');
    readDatabase().then(data => res.send(data))
    .catch((err) => console.log(err));
});

// POST route to get data from client and save that data to db.json file
app.post('/api/notes', async (req, res) => {
    let title = req.body.title;
    let text = req.body.text;
    let newId = uuidv4();
    let newNote = { title: title, text: text, id: newId};

    const db = await readDatabase();
    const notesArray = JSON.parse(db);
    
    notesArray.push(newNote);
    await fs.promises.writeFile('./db/db.json', JSON.stringify(notesArray));
    // Returning the new note to the client
    res.send(newNote);
});

// Delete route
app.delete('/api/notes/:id', async (req, res) => {
    const findId = req.params.id ;

    const db = await readDatabase();
    const notesArray = JSON.parse(db);
    const newNotesArray = notesArray.filter((data) => data.id != findId);

    await fs.promises.writeFile('./db/db.json', JSON.stringify(newNotesArray));

    res.send(newNotesArray);
});

// Notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

// Wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, () =>
  console.log(`App listening on ${PORT} `)
);