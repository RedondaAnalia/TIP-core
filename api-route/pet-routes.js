const express = require('express');
const app = express(); 
var mdAutentication = require ('../middlewares/autentification');
var mdAutorization = require ('../middlewares/autorization');
const petController = require('../controller/petController');
// PET routes
app.put('/',petController.update)
  .post('/application',mdAutentication.verificaToken,mdAutorization.onlyVeterinaries ,petController.application)
  .get('/:id', petController.findOne)
  .get('/', petController.index);
//    .put('/application', petController.updateApplication);

module.exports = app;