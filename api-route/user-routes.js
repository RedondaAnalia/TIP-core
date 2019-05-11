const express = require('express');
const app = express(); 
const mdAutentication = require ('../middlewares/autentification');
const upload = require ('../middlewares/upload');
const userController = require('../controller/userController');


// User routes
app
    .post('/pet',userController.newPet)
    .get('/:email', userController.view)

    /**
     * require:
     *      {
     *          id: String      //UserId
     *          image: String   //Photo user
     *      }
     *  end_point:
     *      {
     *           "message": "User photo updated",
     *           "data": {
     *               "role": String,
     *               "pets": Array,
     *               "experience": Number,
     *               "level": Number,
     *               "_id": String,
     *               "name": String,
     *               "gender": String,
     *               "email": String,
     *               "phone": String,
     *               "create_date": String,
     *               "__v": Number,
     *               "image": String    //storage site
     *           }
     *      }
     */
    .put('/image', upload.upload.single('image') ,userController.image)
    .post('/', userController.new)
    .put('/',mdAutentication.tokenVerifier,userController.update)

module.exports = app;