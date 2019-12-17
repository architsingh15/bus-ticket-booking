const express = require('express')
const Ticket = require('../models/Ticket')

const router = express.Router()

//create a ticket
router.post('/ticket', (req, res) => {
    const ticket = new Ticket(req.body)
    ticket.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ message: err }))
})

module.exports = router
