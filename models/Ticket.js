const mongoose = require('mongoose')

const TicketSchema = mongoose.Schema({
    seat_number: { type: Number, min: 1, max: 40, required: true },
    is_booked: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Ticket', TicketSchema)