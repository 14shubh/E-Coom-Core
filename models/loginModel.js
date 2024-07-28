const mongoose = require('mongoose');
const loginmodel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
    }
})

module.exports = mongoose.model('UsersMaster', loginmodel);