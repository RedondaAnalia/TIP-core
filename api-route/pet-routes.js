let express = require('express');
let app = express(); 


// Import user controller
var petController = require('../controller/petController');
// User routes
app.put('/',petController.update)
    .post('/application',petController.newApplication)
    .get('/:id', petController.findOne)
    .get('/', petController.index)
//    .put('/application', petController.updateApplication);

    module.exports = app;