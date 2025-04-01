const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getEventByID, getOwnedEventsByUserID, getJoinedEventsByUserID, createEvent, joinEventByID, getAllEventsByUserID } = require('../controllers/eventController');
const eventRouter = express.Router();

// IN ALL CASES OTHER THAN get/:id ID is the user's id

// GET: (protected) returns event object based on id
eventRouter.get('/get/:id', getEventByID);

// GET: (protected) returns event objects owned by given user id
eventRouter.get('/owned/:id', getOwnedEventsByUserID);

// GET: (protected) returns event objects joined by given user id
eventRouter.get('/joined/:id', getJoinedEventsByUserID);

// GET: (protected) returns all event objects user id
eventRouter.get('/all/:id', getAllEventsByUserID);

// POST: (protected) adds an event to the database
eventRouter.post('/create', createEvent);

// PUT: (protected) joins user to given event id via an update to the database
eventRouter.put('/join/:id', joinEventByID);

module.exports = eventRouter;