const { default: mongoose } = require('mongoose');
const Event = require('../models/Event');

// Return an Event by ID in parameter
const getEventByID = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found."});
        
        return res.status(200).json(event);
    } catch (err) {
        return res.status(500).json({ message: 'Error retrieving event', err });
    }
};

// Return a list of Events by User ID in parameter
const getOwnedEventsByUserID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const ownedEvents = await Event.find({ owner: id });

        if (!ownedEvents || ownedEvents.length <= 0) return res.status(404).json({ events: [], message: "Owned Events not found or empty."});
        
        return res.status(200).json({ events: ownedEvents });
    } catch (err) {
        return res.status(500).json({ message: 'Error retrieving events', err });
    }
};

// Return a list of Events by User ID in parameter
const getJoinedEventsByUserID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const joinedEvents = await Event.find({ members: id });

        if (!joinedEvents || joinedEvents.length <= 0) return res.status(404).json({ events: [], message: "Joined Events not found."});
        
        return res.status(200).json({ events: joinedEvents});
    } catch (err) {
        return res.status(500).json({ message: 'Error retrieving events', err });
    }
};

const getAllEventsByUserID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        //const joinedEvents = await Event.find({ members: id });

        const joinedEvents = [];

        if (!joinedEvents || joinedEvents.length <= 0) joinedEvents = [];

        const ownedEvents = await Event.find({ owner: id });

        if (!ownedEvents || ownedEvents.length <= 0) ownedEvents = [];

        const allEvents = joinedEvents.concat(ownedEvents);

        return res.status(200).json({ events: allEvents});
    } catch (err) {
        return res.status(500).json({ message: 'Error retrieving events', err });
    }
};

// Create an event and grant ownership
const createEvent = async (req, res) => {
    //const { id } = req.params;
    const { title, start, end, payment_amount, id, location, notes } = req.body;

    if (!title || !start || !id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!payment_amount) {
        payment_amount = "0.00";
    }
    if (!location) {
        location = "";
    }
    if (!notes) {
        notes = "";
    }
    if (!end) {
        end = start;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {

        const createdEvent = await Event.create(
            {
                title: title,
                start: start,
                end: end,
                location: location,
                notes: notes,
                payment_amount: payment_amount,
                owner: id 
            }
        );

        if (!createdEvent) return res.status(404).json({ message: "Event not created."});
        
        return res.status(201).json(createdEvent);
    } catch (err) {
        return res.status(500).json({ message: 'Error creating event', err });
    }
};

// Join an event and grant membership
const joinEventByID = async (req, res) => {
    const { id } = req.params;
    const { event_id } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(event_id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const event = await Event.updateOne(
            { _id: event_id },
            { $push: { members: id } }
         );

        if (!event) return res.status(404).json({ message: "Event not joined as event doesn't exist."});
        
        return res.status(200).json(event);
    } catch (err) {
        return res.status(500).json({ message: 'Error joining event', err, info: { userID: id, eventID: event_id } });
    }
};

module.exports = { getEventByID, getOwnedEventsByUserID, getJoinedEventsByUserID, createEvent, joinEventByID, getAllEventsByUserID };