const mongoose = require('mongoose')
const User = require('../models/User')

const TicketSchema = mongoose.Schema({
    seat_number: { type: Number, min: 1, max: 40, required: true },
    is_booked: { type: Boolean, default: true },
    date: { type: Date, default: Date.now() },
    passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Ticket', TicketSchema)