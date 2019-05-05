const express = require('express');
const app = express(); 
var mdAutentication = require ('../middlewares/autentification');
var mdAutorization = require ('../middlewares/autorization');
const petController = require('../controller/petController');
// PET routes
//app.put('/',petController.update);
app.post('/application',mdAutentication.tokenVerifier,mdAutorization.onlyVeterinaries ,petController.application)
  /* Body expected:
  {
    pet_id: String,
    email: String,
    medicalCard:{
          title: String,
          diagnostic: String,
          veterinary: String(vetId)
    }
  }
   */
  .post('/medicalCard', mdAutorization.onlyVeterinaries, petController.addMedicalCard)
  .get('/:id', petController.findOne)
//    .put('/application', petController.updateApplication);

module.exports = app;