// improve error messaging
const express = require('express')
const Ticket = require('../models/Ticket')
const User = require('../models/User')

const router = express.Router()

//create a ticket
router.post('/ticket', (req, res) => {
    const { passenger } = req.body
    const ticket = new Ticket({ seat_number: req.body.seat_number })
    const user = new User(passenger)
    user.save(function (err, userCreated) {
        if (err) return res.json({ message: err })
        if (userCreated) {
            ticket.passenger = user._id
            ticket.save()
                .then(data => res.status(200).json(data))
                .catch(err => res.json({ message: err }))
        }
    })
})

module.exports = router
