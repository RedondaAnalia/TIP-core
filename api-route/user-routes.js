const express = require('express');
const app = express(); 
var mdAutentication = require ('../middlewares/autentification');
const userController = require('../controller/userController');

// User routes
app.post('/pet',userController.newPet)
  .get('/:email', userController.view)
  .post('/', userController.new)
  .put('/',mdAutentication.tokenVerifier,userController.update)

module.exports = app;