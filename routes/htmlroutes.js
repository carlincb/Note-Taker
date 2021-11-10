const router = require('express').Router();
const path = require('path');

// Notes route
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'notes.html'))
});

// Wildcard route
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});
// Exporting the router from this file for import in different file
module.exports = router;