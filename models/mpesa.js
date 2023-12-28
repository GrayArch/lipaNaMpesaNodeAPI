const mongoose = require('mongoose');

const mpesaSchema = new mongoose.Schema({
    phoneNumber: String,
    amount: Number,
    description: String,
});

const Mpesa = mongoose.model('Mpesa', mpesaSchema);

module.exports = Mpesa;