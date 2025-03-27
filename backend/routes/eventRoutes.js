const express = require('express');

const protect = require('../middleware/authMiddleware');
const eventRouter = express.Router();



module.exports = eventRouter;