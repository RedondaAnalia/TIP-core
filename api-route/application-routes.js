let express = require('express');
let app = express(); 


// Import application controller
var applicationController = require('../controller/applicationController');
// User routes
app.get('/', applicationController.index)
app.put('/', applicationController.update)
    module.exports = app;