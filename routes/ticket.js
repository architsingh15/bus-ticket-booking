// improve error messaging
// create joi configurable middleware 
// add logging middleware
// add docstrings
// check for correct usages of const and let
// add proper status codes
// use q to return simplified promises
// replace  res.status(404).json({ message: data }) with one function
// think of validations to add for all routes
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
    if (!result) return res.status(404).json({ message: data })

    const ticket = new Ticket({ seat_number: seat_number })
    const user = new User(passenger)

    user.save()
        .then(data => {
            if (data) {
                ticket.passenger = user._id
                ticket.save()
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(404).json({ message: err }))
            }
        })
        .catch(err => res.status(404).json({ message: err }))

})

//update a ticket, update open/closed and user_details
//is_booked, and any of the user details attributes are only allowed to be passed 
router.put('/ticket/:ticket_id', (req, res) => {
    const { ticket_id } = req.params
    const payload = req.body

    Ticket.findById(ticket_id, function (err, ticket) {
        if (err) res.status(404).json({ message: err })
        if (ticket) {
            const user_id = ticket.passenger
            User.findById(user_id)
                .then(user => {
                    ticket.is_booked = payload.is_booked
                    user.name = payload.passenger.name
                    user.sex = payload.passenger.sex
                    user.email = payload.passenger.email
                    user.phone = payload.passenger.phone
                    user.age = payload.passenger.age
                    ticket.save()
                        .then(data => {
                            user.save()
                                .then(data => res.status(202).json(data))
                                .catch(err => res.status(404).json({ message: err }))
                        })
                        .catch(err => res.status(404).json({ message: err }))
                })
                .catch(err => res.status(404).json({ message: err }))
        }
    });
})

// get the status of a ticket based on ticket_id
router.get('/ticket/:ticket_id', (req, res) => {
    const { ticket_id } = req.params
    Ticket.findById(ticket_id, function (err, ticket) {
        if (err) res.status(404).json({ message: err })
        if (ticket) res.status(200).json({ status: ticket.is_booked })
    })
})

// get list of all open tickets
router.get('/tickets/open', (req, res) => {
    Ticket.find({ is_booked: false }, (err, data) => {
        if (err) res.status(404).json({ message: err })
        if (data) res.status(200).json(data)
    })
})

// get list of all closed tickets
router.get('/tickets/closed', (req, res) => {
    Ticket.find({ is_booked: true }, (err, data) => {
        if (err) res.status(404).json({ message: err })
        if (data) res.status(200).json(data)
    })
})

// View person details of a ticket
router.get('/ticket/details/:ticket_id', (req, res) => {
    const { ticket_id } = req.params
    Ticket.findById(ticket_id, function (err, ticket) {
        if (err) res.status(404).json({ message: err })
        if (ticket) {
            User.findById(ticket.passenger, function (err, user) {
                if (err) res.status(404).json({ message: err })
                if (user) res.status(200).json(user)
            })
        }
    })
})

router.post('/tickets/reset', (req, res) => {
    const { username, password } = req.body
    let authenticated = false
    if (username === process.env.USER && password === process.env.PASSWORD) {
        authenticated = true
    }

    if (authenticated) {
        let update = { is_booked: false }
        Ticket.updateMany({}, update,
            (err, data) => {
                if (err) console.log(err)
                if (data) console.log(data)
            })
    }
})
module.exports = router
