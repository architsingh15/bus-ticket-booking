const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: String,
    sex: String,
    age: Number,
    phone: { type: String, unique: true },
    email: { type: String, unique: true },
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);