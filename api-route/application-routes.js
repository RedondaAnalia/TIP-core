let express = require('express');
let app = express(); 
var mdAutentication = require ('../middlewares/autentification');
var mdAutorization = require ('../middlewares/autorization');


// Import application controller
var applicationController = require('../controller/applicationController');
// User routes
app.put('/',mdAutentication.tokenVerifier,mdAutorization.onlyVeterinaries ,applicationController.update)
    .put('/apply',applicationController.markAsApplied)
    module.exports = app;