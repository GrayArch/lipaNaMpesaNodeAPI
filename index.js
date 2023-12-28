const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const connectDB = require('./utils/database');
const mpesaRoutes = require('./routes/mpesa');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mpesaRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});