const express = require('express');
const router = express.Router();

const { getCurrentEvents } = require('../controllers/events');

router.get('/', getCurrentEvents);

module.exports = router;
