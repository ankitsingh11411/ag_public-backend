const express = require('express');
const { getAllCars } = require('../controllers/carController');

const router = express.Router();

router.get('/', getAllCars);

module.exports = router;
