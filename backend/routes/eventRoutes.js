const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getEventByID, getOwnedEventsByUserID, getJoinedEventsByUserID, createEvent, joinEventByID } = require('../controllers/eventController');
const eventRouter = express.Router();

// IN ALL CASES OTHER THAN get/:id ID is the user's id

// GET: (protected) returns event object based on id
eventRouter.get('/get/:id', protect, getEventByID);

// GET: (protected) returns event objects owned by given user id
eventRouter.get('/owned/:id', protect, getOwnedEventsByUserID);

// GET: (protected) returns event objects joined by given user id
eventRouter.get('/joined/:id', protect, getJoinedEventsByUserID);

// POST: (protected) adds an event to the database
eventRouter.post('/create/:id', protect, createEvent);

// PUT: (protected) joins user to given event id via an update to the database
eventRouter.put('/join/:id', protect, joinEventByID);

module.exports = eventRouter;