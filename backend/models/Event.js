// Events model
// - Title
// - Start
// - End
// - Location/Address
// - Notes
// - Payment Amount = 0
// * Owner
// * Event Members
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    location: { type: String, required: false },
    notes: { type: String, required: false },
    payment_amount: { type: String, required: true },
    owner: { type: String, required: true },
    members: { type: [mongoose.Schema.Types.ObjectId], required: false }
});

module.exports = mongoose.model('Event', eventSchema);