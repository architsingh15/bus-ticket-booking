var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"], maxlength: 100 },
    sex: { type: String, required: [true, "can't be blank"], maxlength: 1 },
    age: { type: Number, required: [true, "can't be blank"] },
    phone: { type: String, required: [true, "can't be blank"], index: true, maxlength: 10 },
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
});

module.exports = mongoose.model('User', UserSchema);