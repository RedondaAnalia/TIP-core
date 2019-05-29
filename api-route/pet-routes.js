const express = require('express');
const app = express(); 
const mdAutentication = require ('../middlewares/autentification');
const mdAutorization = require ('../middlewares/autorization');
const petController = require('../controller/petController');
const upload = require ('../middlewares/upload');
const jsonValidator = require ('../middlewares/jsonValidator');

// PET routes

app.post('/application',jsonValidator.newApplicationJSONValidator, mdAutentication.tokenVerifier,mdAutorization.onlyVeterinaries ,petController.application)
    .post('/medicalCard', mdAutorization.onlyVeterinaries, petController.addMedicalCard)

    /**
     * require:
     *  {
     *      id: String      //PetId
     *      image: String   //Photo pet
     *  }
     *  end_point:
     * {
     *  "message": "Pet photo updated",
     *  "data": {
     *      "castrate": Boolean,
     *      "applications": Array,
     *      "milestones": Array,
     *      "medical_story": Array,
     *      "experience": Number,
     *      "level": Number,
     *      "_id": String,
     *      "name": String,
     *      "gender": String,
     *      "date_of_birth": String,
     *      "create_date": String,
     *      "__v": Number,
     *      "image": String
     *      }
     *  }
     */
    .put('/image', upload.upload.single('image') ,petController.image)
    .get('/:id', petController.findOne)
    .get('/castrate/:id',mdAutentication.tokenVerifier,mdAutorization.onlyVeterinaries ,petController.castrate)

module.exports = app;