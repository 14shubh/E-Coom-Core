const mongoose = require('mongoose');
const loginmodel = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('UserIdentity', loginmodel);