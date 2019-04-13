let express = require('express');
let app = express(); 


// Import user controller
var vaccineController = require('../controller/vaccineController');
// User routes
app.get('/', vaccineController.index)
   .post('/', vaccineController.new);

    module.exports = app;