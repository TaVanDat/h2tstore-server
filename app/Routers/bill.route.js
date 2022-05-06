const express = require('express')
const router = express.Router();

const billController = require('../Controllers/bill.controller')

// get all order
router.get('/all', billController.getList);

module.exports = router