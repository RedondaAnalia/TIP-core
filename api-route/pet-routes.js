const express = require('express');
const app = express(); 
var mdAutentication = require ('../middlewares/autentification');
var mdAutorization = require ('../middlewares/autorization');
const petController = require('../controller/petController');
const upload = require ('../middlewares/upload');

// PET routes

app.post('/application',mdAutentication.tokenVerifier,mdAutorization.onlyVeterinaries ,petController.application)
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


module.exports = app;