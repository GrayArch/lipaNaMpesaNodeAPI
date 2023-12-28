const Mpesa = require('../models/mpesa');

exports.getAllTransactions = async (req, res) => {
    const transactions = await Mpesa.find();
    res.send(transactions);
};

exports.createTransaction = async (req, res) => {
    const newTransaction = new Mpesa(req.body);
    const savedTransaction = await newTransaction.save();
    res.send(savedTransaction);
};

exports.getTransaction = async (req, res) => {
    try {
        const response = await axios.get(`https://api.dataja.com/v2/transactions/${req.params.id}`, {
            headers: {
                'Authorization': 'Bearer YOUR_DATAJA_API_KEY'
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching transaction details from Dataja API');
    }
};