const express = require('express');
const app = express();
const userController = require('../controller/userController');
const mdAutentication = require ('../middlewares/autentification');
const mdAutorization = require ('../middlewares/autorization');
const jsonValidator = require ('../middlewares/jsonValidator');
const uploadS3 = require('../services/upload-s3');


// User routes
app
    .get('/', userController.view)
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

    .put('/image', uploadS3.single('image') ,userController.image)
    .post('/',jsonValidator.newUserJSONValidator, userController.new)

    /**
     * require:
     *      {
     *          id: String      //UserId
     *          password: String   //Password user
     *      }
     *  end_point:
     *      {
     *           "message": "User password updated",
     *      }
     */

    .put('/',mdAutentication.tokenVerifier,userController.update)

    /**
     * require:
     *      {
     *          id: String      //UserId
     *          password: String   //Password user
     *      }
     *  end_point:
     *      {
     *           "message": "User password updated",
     *      }
     */
    .put('/password',mdAutentication.tokenVerifier,mdAutorization.onlyUsers ,userController.password)
    /**
     * require:
     *      {
     *          id: String      //UserId
     *          exp: Number   //Password user
     *      }
     *  end_point:
     *      {
     *           "message": "User exp updated",
     *           "user": User
     *      }
     */
    .put('/experience',userController.addExp);

module.exports = app;