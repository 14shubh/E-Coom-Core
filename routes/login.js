const express = require('express');
const route = express.Router();
const login = require('../controller/loginController')

route.get('/sign-in', login.signIn);
route.post('/register', login.register);
module.exports = route;