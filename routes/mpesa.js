const express = require('express');
const router = express.Router();

const mpesaController = require('../controllers/mpesa');

router.get('/transactions', mpesaController.getAllTransactions);
router.post('/transactions', mpesaController.createTransaction);
router.get('/transaction/:id', mpesaController.getTransaction);

module.exports = router;