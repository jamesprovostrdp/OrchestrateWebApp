const Event = require('../models/Events');

// Return an Event by ID in parameter
const getEventByID = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found."});
        
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving event', err });
    }
};

// Return a list of Events by User ID in parameter
const getOwnedEventsByUserID = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found."});
        
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving event', err });
    }
};

module.exports = { registerUser, loginUser };