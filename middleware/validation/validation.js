const Joi = require('joi')

function validateObj(obj, schema) {
    let result = null
    Joi.validate(obj, schema, (err, data) => {
        if (err) {
            result = [false, err]
        }
        else {
            result = [true, data]
        }
    })
    return result
}

function userValidation(user) {
    const userSchema = Joi.object().keys({
        name: Joi.string().trim().min(5).max(100).required(),
        sex: Joi.string().trim().max(1).required(),
        age: Joi.number().min(18).required(),
        phone: Joi.string().trim().max(10).required(),
        email: Joi.string().trim().email().required(),
    })
    return validateObj(user, userSchema)
}

function openTicket(ticket) {
    ticket.is_booked = false
    ticket.save()
        .then(data => console.log(`Opened ticket with ticketID: ${ticket._id}`))
        .catch(err => console.log(`Failed to open ticket with ticketID: ${ticket._id}`))
}

module.exports = {
    userValidation: userValidation,
    openTicket: openTicket,
}

