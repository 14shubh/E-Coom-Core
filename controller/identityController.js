const identityModel = require("../models/identityModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.signIn = (request, response, next) => {
    identityModel
        .findOne({ email: request.body.email })
        .collation({ locale: "en", strength: 2 })
        .then((data) => {
            if (data == null || data.length == 0) {
                return response.status(201).json({
                    message: "Email not found",
                    data: data,
                });
            } else {
                bcrypt.compare(request.body.password, data.password, (err, result) => {
                    if (result) {
                        userModel.findById({_id: data._id}).then(result=>{
                                return response.status(200).json({
                                message: "login Success",
                                data: result,
                            });
                        })
                    } else {
                        return response.status(200).json({
                            message: "Password did not match",
                        });
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return response.status(501).json({
                message: "Internal Server Error",
                data: err,
            });
        });
};

exports.register = (request, response, next) => {
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const fullName = `${request.body.firstName} ${request.body.lastName}`;
    const phoneNumber = request.body.phoneNumber != undefined ? request.body.phoneNumber : null;
    const errorValidation = validator.validationResult(email);
    identityModel
        .findOne({ email: request.body.email })
        .collation({ locale: "en", strength: 2 })
        .then((data) => {
            if (data != null) {
                return response.status(200).json({
                    message: "Email already in use",
                });
            } else {
                bcrypt.genSalt(13, (err, salt) => {
                    bcrypt.hash(request.body.password, salt, (hashError, hash) => {
                        if (hash) {
                            const user = new userModel({
                                firstName: firstName,
                                lastName: lastName,
                                fullName: fullName,
                                email: request.body.email,
                                password: hash,
                                phoneNumber: phoneNumber,
                            });
                            identityModel.create({email: request.body.email, password: hash}).then(result=>{
                                    if(result){
                                        delete user.password;
                                        user._id = result._id;
                                        user.save()
                                        .then((data) => {
                                            return response.status(200).json({
                                                message: "User Created",
                                                data: data,
                                            });
                                        })
                                        .catch((err) => {
                                            return response.status(500).json({
                                                message: "Internal Server Error",
                                                error: err,
                                            });
                                        });
                                    }
                                })
                                
                        } else {
                            console.log(hashError, "error");
                        }
                    });
                });
            }
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Internal Server Error",
                error: error,
            });
        });
};
exports.forgotPassword = (request, response, next) => {
    const user = new loginModel();
    console.log(request.body.password, " Password");
    identityModel.findOne({ email: request.body.email }).then((result) => {
            if (!result) {
                return response.status(400).json({
                    message: "Email not found",
                    data: result,
                });
            } else {
                bcrypt.genSalt(13, (err, salt) => {
                    bcrypt.hash(request.body.password, salt, (hashError, hash) => {
                        console.log(hash, " hash Password");
                        if (hash) {
                            identityModel.updateOne(
                                { _id: result._id },
                                {
                                    $set: {
                                        password: hash
                                    },
                                }
                            ).then(data =>{
                                return response.status(200).json({
                                    message: "Password updated successfully",
                                    data: data
                                });
                            })
                        } else {
                            return response.status(200).json({
                                errorMessage: hashError,
                            });
                        }
                    });
                });
            }
        }).catch((error) => {
            return response.status(500).json({
                errorMessage: "Something went wrong",
                errorData: error,
            });
        });
};
