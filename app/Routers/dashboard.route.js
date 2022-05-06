const express = require('express');
const router = express.Router();
const dashboardController = require('../Controllers/dashboard.controller')
router.get('/all', dashboardController.countAllPro, dashboardController.countAllOrders, dashboardController.countAllAccount, dashboardController.countAllRevenue, dashboardController.dashboardAll)
module.exports = router;