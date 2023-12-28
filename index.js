// import the required packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

// initialize the express app
const app = express();

// middleware to parse the body of POST, PUT, DELETE requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define the mpesa model
const mpesaSchema = new mongoose.Schema({
    phoneNumber: String,
    amount: Number,
    description: String,
});

// initialize the model
const Mpesa = mongoose.model('Mpesa', mpesaSchema);

// connect to the mongo db database
mongoose.connect('mongodb://localhost/mpesaDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB:', err));

// set up a GET request to fetch all transactions
app.get('/transactions', async (req, res) => {
    const transactions = await Mpesa.find();
    res.send(transactions);
});

// set up a POST request to create a new transaction
app.post('/transactions', async (req, res) => {
    const newTransaction = new Mpesa(req.body);
    const savedTransaction = await newTransaction.save();
    res.send(savedTransaction);
});

// set up a GET request to fetch transaction details using the Dataja API
app.get('/transaction/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://api.daraja.com/v2/transactions/${req.params.id}`, {
            headers: {
                'Authorization': 'Bearer YOUR_DARAJA_API_KEY'
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching transaction details from Daraja API');
    }
});

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});