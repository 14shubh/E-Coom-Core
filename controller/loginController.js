const loginModel = require('../models/loginModel');
const bcrypt = require('bcrypt');

exports.signIn = (request, response, next) => {
    loginModel.findOne({ email: request.body.email }).collation({ locale: 'en', strength: 2 }).then((data) => {
        console.log(data, "data one")
        if (data == null || data.length == 0) {
            return response.status(201).json({
                message: "Email not found",
                data: data
            })
        } else {
            bcrypt.compare(request.body.password, data.password, (err, result) => {
                if (result) {
                    return response.status(200).json({
                        message: "login Success",
                        data: data
                    });
                } else {
                    return response.status(200).json({
                        message: "Password did not match"
                    })
                }
            });
        }
    }).catch((err) => {
        console.log(err);
        return response.status(501).json({
            message: "Internal Server Error",
            data: err
        });
    })
}

exports.register = (request, response, next) => {

        bcrypt.genSalt(13, (err, salt) => {
            bcrypt.hash(request.body.password, salt, (hashError, hash) => {
                if (hash) {
                    const user = new loginModel({
                        name: request.body.name,
                        email: request.body.email,
                        password: hash
                    });
                    user.save().then((data) => {
                        return response.status(200).json({
                            message: "User Creation Successfull",
                            data: data
                        });
                    }).catch((err) => {
                        return response.status(500).json({
                            message: "Internal Server Error",
                            error: err
                        });
                    })
                } else {
                    console.log(hashError, "error")
                }
            })
        })
    }
    // exports.forgotPassword = (request, response, next) => {
    //     const user = new loginModel();
    //     user.findOne(request.body.email).then((result) => {
    //         if (!result) {
    //             return response.status(400).json({
    //                 message: "Email not found",
    //                 data: result
    //             })
    //         } else {

//             bcrypt.genSalt(13, (err, salt) => {
//                 bcrypt.hash(request.body.password, salt, (hashError, hash) => {
//                     if (hash) {
//                         user.updateOne({ _id: result._id }, {
//                             $set: {
//                                 password:
//                             }
//                         })
//                     } else {
//                         console.log(hashError, "error")
//                     }
//                 })
//             })

//         }
//     }).catch((error) => {

//     })
// }