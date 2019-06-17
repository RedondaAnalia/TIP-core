const express = require('express');
const app = express();
const friendController = require('../controller/friendController');



// User routes
app
/**
 * url: localhost:3000/friends/relationship
 * POST
 * json:
 * {
 *  "aMail": String,
 *	"bMail": String
 * }
 */
    .post('/relationship', friendController.relationship)


module.exports = app;