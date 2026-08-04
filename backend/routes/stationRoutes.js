const express = require('express');
const router = express.Router();
const {getStations} = require('../controller/stationController');

router.get("/",getStations);

module.exports = router ;