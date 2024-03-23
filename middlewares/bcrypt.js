const bcrypt = require('bcrypt');
exports.encryptPassword = async(password) => {
    console.log(password);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (hashError, hash) => {
            if (hash) {
                console.log(hash, "Password")
                return hash;
            } else {
                console.log(hashError, "error")
            }
        })
    })
}