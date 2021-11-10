// Defining variables to bring in required packages
const express = require('express');
const routes = require('./routes');

// Defining the port we want the server to run on
const PORT = process.env.PORT || 3001;

// Defining variable so that express can be used
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using public directory for any static files
app.use(express.static('public'));

// Telling express to use routes directory for routing
app.use('/', routes);

// Starting the server process
app.listen(PORT, () =>
  console.log(`App listening on ${PORT} `)
);