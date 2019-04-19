var express= require('express');
var app= express();
var loginController = require('../controller/loginController');

//========================================
// Autenticacion google
//========================================
app.post('/google', loginController.singWithGoogle)

//========================================
// Autenticacion normal
//========================================
app.post('/', loginController.sing)

module.exports = app;