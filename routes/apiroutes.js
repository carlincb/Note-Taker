const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Helper function to read db file
async function readDatabase () {
    const db = await fs.promises.readFile(path.join('db', 'db.json'));
    return db;
};

// GET route to read and return data from db.json file
router.get('/notes', (req, res) => {
    readDatabase().then(data => res.send(data))
    .catch((err) => console.log(err));
});

// POST route to get data from client and save that data to db.json file
router.post('/notes', async (req, res) => {
    // Guard clause/error handling
    if(!req.body.title && !req.body.text){
        console.log('Title and text not found on body.')
        res.json({message: 'Error: Title and text not found on body.'})
    };

    let title = req.body.title;
    let text = req.body.text;
    let newId = uuidv4();
    let newNote = { title: title, text: text, id: newId};

    const db = await readDatabase();
    const notesArray = JSON.parse(db);
    
    notesArray.push(newNote);
    await fs.promises.writeFile(path.join('db', 'db.json'), JSON.stringify(notesArray));
    // Returning the new note to the client
    res.send(newNote);
});

// Delete route
router.delete('/notes/:id', async (req, res) => {
    // Guard clause/error handling
    if (!req.params.id){
        console.log('Id not found on delete request.')
        res.json({message: 'Error: Id not found on delete request.'})
    };

    const findId = req.params.id ;

    const db = await readDatabase();
    const notesArray = JSON.parse(db);
    const newNotesArray = notesArray.filter((data) => data.id != findId);

    await fs.promises.writeFile(path.join('db', 'db.json'), JSON.stringify(newNotesArray));

    res.send(newNotesArray);
});
// Exporting the router from this file for import in different file
module.exports = router;