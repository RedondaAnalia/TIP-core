let express = require('express');
let app = express(); 


// Import user controller
var userController = require('../controller/userController');
// User routes
app.post('/pet',userController.newPet)
    .get('/', userController.index)
    .post('/', userController.new);



    module.exports = app;