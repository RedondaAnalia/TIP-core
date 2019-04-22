let express = require('express');
let app = express(); 
var mdAutentication = require ('../middlewares/autentification');
var mdAutorization = require ('../middlewares/autorization');


// Import application controller
var applicationController = require('../controller/applicationController');
// User routes
app.get('/', applicationController.index)
app.put('/',mdAutentication.verificaToken,mdAutorization.onlyVeterinaries ,applicationController.update)
    module.exports = app;