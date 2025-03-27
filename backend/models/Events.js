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
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    title: { type: String, required: false },
    notes: { type: String, required: false },
    payment_amount: { type: Double, required: true },
    owner: { type: [mongoose.Types.ObjectId], required: true },
    members: { type: [mongoose.Types.ObjectId], required: false }
});

module.exports = mongoose.model('Event', eventSchema);