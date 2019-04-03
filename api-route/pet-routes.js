let express = require('express');
let app = express(); 


// Import user controller
var petController = require('../controller/petController');
// User routes
app.put('/',petController.update)
    .post('/application',petController.newApplication)
  //  .get('/application', petController.getApplication)
  //  .put('/application', petController.updateApplication);

    module.exports = app;