// improve error messaging
// create joi middleware 
// add docstrings
// check for correct usages of const and let
// add proper status codes
const express = require('express')
const Ticket = require('../models/Ticket')
const User = require('../models/User')
const validation = require('../middleware/validation/validation')
const userValidation = validation.userValidation

const router = express.Router()

//create a ticket
router.post('/ticket', (req, res) => {
    const { seat_number, passenger } = req.body

    let [result, data] = userValidation(passenger)
    if (!result) return res.json({ message: data })

    const ticket = new Ticket({ seat_number: seat_number })
    const user = new User(passenger)

    user.save((err, userCreated) => {
        // console.log(err, userCreated)
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
