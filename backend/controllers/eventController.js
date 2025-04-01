const { default: mongoose } = require('mongoose');
const Event = require('../models/Event');

// Return an Event by ID in parameter
const getEventByID = async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);

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
        const userObjectID = mongoose.Types.ObjectId(id);

        const joinedEvents = await Event.find({ members: userObjectID });

        if (!joinedEvents || joinedEvents.length <= 0) return res.status(404).json({ message: "Joined Events not found."});
        
        return res.status(200).json({ events: joinedEvents});
    } catch (err) {
        return res.status(500).json({ message: 'Error retrieving events', err });
    }
};

// Create an event and grant ownership
const createEvent = async (req, res) => {
    //const { id } = req.params;
    const { title, start, end, payment_amount, id } = req.body;

    if (!title || !start || !end || !payment_amount || !id) {
        return res.status(400).json({ error: 'Missing required fields' });
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


    if (!mongoose.Types.ObjectId.isValid(id) || !!mongoose.Types.ObjectId.isValid(event_id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const userObjectID = mongoose.Types.ObjectId(id);
        const eventObjectID = mongoose.Types.ObjectId(event_id);

        const event = await Event.findByIdAndUpdate(
            eventObjectID,
            { $addToSet: { members: userObjectID } },  // Add member if not already in the array
            { new: true }  // Return the updated document
          );

        if (!event) return res.status(404).json({ message: "Event not joined as event doesn't exist."});
        
        return res.status(200).json(event);
    } catch (err) {
        return res.status(500).json({ message: 'Error joining event', err });
    }
};

module.exports = { getEventByID, getOwnedEventsByUserID, getJoinedEventsByUserID, createEvent, joinEventByID };