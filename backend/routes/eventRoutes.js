const express = require('express');
const protect = require('../middleware/authMiddleware');
const eventRouter = express.Router();

// GET: (protected) returns event object based on id
eventRouter.get('/get/:id', protect, getEventByID);

// GET: (protected) returns event objects owned by given user id
eventRouter.get('/owned/:id', protect, getOwnedEventsByUserID);

// GET: (protected) returns event objects joined by given user id
eventRouter.get('/joined/:id', protect, getJoinedEventsByUserID);

// GET: (protected) returns all event objects based on user id
eventRouter.get('/all/:id', protect, getAllEventsByUserID);

// POST: (protected) adds an event to the database
eventRouter.post('/create', protect, createEvent);

// PUT: (protected) joins user to given event id via an update to the database
eventRouter.put('/join/:id', protect, joinEventByID);

module.exports = eventRouter;