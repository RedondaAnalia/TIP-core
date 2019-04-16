const express = require('express');
const app = express(); 

// Import user controller
const userController = require('../controller/userController');
// User routes
app.post('/pet',userController.newPet)
  .get('/', userController.index)
  .get('/:email', userController.view)
  .post('/', userController.new);

module.exports = app;