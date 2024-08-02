const mongoose = require('mongoose');
const loginmodel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
    },
});

// loginmodel.virtual('fullName').get(function(){
//     return `${this.firstName} ${this.lastName}`;
// })

module.exports = mongoose.model('UsersMaster', loginmodel);