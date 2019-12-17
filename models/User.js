var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    sex: String,
    age: Number,
    phone: String,
    email: String,
});

module.exports = mongoose.model('User', UserSchema);