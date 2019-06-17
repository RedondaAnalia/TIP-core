const express = require('express');
const app = express();
const userController = require('../controller/userController');
const mdAutentication = require ('../middlewares/autentification');
const mdAutorization = require ('../middlewares/autorization');
const jsonValidator = require ('../middlewares/jsonValidator');
const uploadS3 = require('../services/upload-s3');


// User routes
app
    .post('/pet',jsonValidator.newPetJSONValidator,userController.newPet)
    .put('/image', uploadS3.single('image') ,userController.image)

    .post('/',jsonValidator.newUserJSONValidator, userController.new)

    .put('/',mdAutentication.tokenVerifier,userController.update)

    .put('/password',mdAutentication.tokenVerifier,mdAutorization.onlyUsers ,userController.password)

    .put('/experience',jsonValidator.addExpJSONValidator,userController.addExp)

    .get('/search/', userController.search)

    .get('/friends/',userController.friends)

    .get('/:email', userController.view);


module.exports = app;