const express = require('express');
const app = express();
const friendController = require('../controller/friendController');



// User routes
app
    .post('/relationship', friendController.relationship)
    .get('/:email',friendController.friends)

module.exports = app;