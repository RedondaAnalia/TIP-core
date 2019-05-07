var express= require('express');
var app= express();
var loginController = require('../controller/loginController');

//========================================
// Autenticacion normal
//========================================
app.post('/', loginController.sign)

module.exports = app;