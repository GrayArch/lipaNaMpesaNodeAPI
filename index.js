// import the required packages
const express = require('express');
const bodyParser = require('body-parser');

// initialize the express app
const app = express();

// middleware to parse the body of POST, PUT, DELETE requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up a simple GET request
app.get('/', (req, res) => {
    res.send('Welcome to the Express API');
});

// set up a POST request
app.post('/post-example', (req, res) => {
    console.log(req.body);
    res.send('Post request received');
});

// set up a PUT request
app.put('/put-example/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.send('Put request received');
});

// set up a DELETE request
app.delete('/delete-example/:id', (req, res) => {
    console.log(req.params.id);
    res.send('Delete request received');
});

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});