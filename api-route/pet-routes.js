const express = require('express');
const app = express(); 

const petController = require('../controller/petController');
// PET routes
app.put('/',petController.update)
  .post('/application',petController.application)
  .get('/:id', petController.findOne)
  .get('/', petController.index);
//    .put('/application', petController.updateApplication);

module.exports = app;