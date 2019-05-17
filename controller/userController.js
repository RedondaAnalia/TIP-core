const userRepository = require('../repository/user.repository');
const User = require('../model/userModel');


// PROP: Creates a new user in the DB
exports.new = function (req, res) {
  userRepository.new(req.body)
                .then(user => {
                            res.status(200).json({
                              ok : true,
                              message: 'New user created!',
                              data: user
                            });
                }).catch(err => {
                            res.status(412).json({
                              ok: false,
                              message: 'Error creating new user!',
                              err
                            });
                });
};


// PROP: Returns the corresponding user to the mail that arrives by parameter.
exports.view = function (req, res) {
  userRepository.findByEmail(req.params.email)
                .then( user => {
                            res.status(200).json({
                                        ok:true,
                                        message: 'User found!',
                                        data: user
                            });
                }).catch(err => {
                            res.status(404).json({
                                        ok:false,
                                        message: 'Error finding user!',
                                        err
                            });
                });
};


// PROP: Adds a new pet to an user.
// TODO: Hacer un middleware que verifique los campos necesarios para poder crear el pet.
exports.newPet = (req, res) => {
  userRepository.addPet(req.body.user_id,req.body.pet)
                .then(user => {
                            res.status(200).json({
                                        ok:true,
                                        message: 'Pet succesfully added!',
                                        user
                            });
                }).catch(err =>{
                            return res.status(412).json({
                                        ok:false,
                                        message: 'Error adding pet!',
                                        err
                            })
                });
};




exports.newPet = (req, res) => {
  userRepository.addPet(req.body.user_id,req.body.pet).then(user => {
    res.status(200).json({
      ok:true,
      user
    });
  }).catch(err =>{
    res.status(400).json({
      ok:false,
      error: err
  })
});
}

exports.image = function (req, res) {
    console.log(req.file)
    userRepository.updateImage(req.body.id,req.file.location).then(user =>{
        if(!user){
            res.status(404).json({
                ok: false,
                message : 'User not found',
                errors : err
            })
        }
        res.status(200).json({
            message: 'User photo updated',
            data: user
        });
    }).catch(err =>{
        res.status(400).json({
            ok: false,
            message : 'Error al actualizar photo del usuario',
            errors : err
        })
    })

};


// Handle update user password
exports.password = function (req, res) {
    User.changePassword(req.body.id,req.body.password).then(user => {
        if (!user){
            return res.status(400).json({
                ok: false,
                message : 'User not found',
            });
        }
        res.json({
            message: 'User password updated',
            data: user  
        });
    }).catch(err => {
        res.status(400).json({
            ok: false,
            message : 'Error user password updated',
            errors : err
        })
    });
};




// FIXME: ESTOS UPDATES EN FUTURO VAN A SER MAS ESPECIFICOS. QUEDAN PARA NO ROMPER NADA.
// Handle update user info
exports.update = function (req, res) {
  User.update(req.body).then(user => {
    if (!user){
      return res.status(400).json({
          ok: false,
          message : 'No se encontro el usuario',
        });
      }
      res.json({
        message: 'User Info updated',
        data: user
      });
    }).catch(err => {
      res.status(400).json({
        ok: false,
        message : 'Error al actualizar el usuario',
        errors : err
      })
    });
  };





