const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

async function readDatabase () {
    const db = await fs.promises.readFile('./db/db.json');
    return db;
}
app.get('/api/notes', (req, res) => {
    console.log('Hit /api/notes route');
    readDatabase().then(data => res.send(data));
})
// Notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

// Wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);