const express = require('express');
const route = express.Router();
const login = require('../controller/identityController')

route.get('/sign-in', login.signIn);
route.post('/register', login.register);
route.post('/forget', login.forgotPassword);
module.exports = route;