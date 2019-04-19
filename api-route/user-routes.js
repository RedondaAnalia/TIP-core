const express = require('express');
const app = express(); 
var mdAutentication = require ('../middlewares/autentification');
const userController = require('../controller/userController');

// User routes
app.post('/pet',userController.newPet)
  .get('/', userController.index)
  .get('/:email', userController.view)
  .post('/', userController.new)
  .put('/',mdAutentication.verificaToken,userController.update)
  .delete('/:user_id',mdAutentication.verificaToken,userController.delete)

module.exports = app;