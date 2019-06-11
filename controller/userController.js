const userRepository = require('../repository/user.repository');
const User = require('../model/userModel');
const { validationResult } = require('express-validator/check');


// PROP: Creates a new user in the DB
exports.new = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

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
        message:"pet added to "+ user.mail,
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

exports.addExp= function(req,res) {
    userRepository.addExperience(req.body.id,req.body.exp).then(user => {
        if (!user){
            return res.status(400).json({
                ok: false,
                message : 'User not found',
            });
        }
        res.json({
            message: 'User exp updated',
            data: user
        });
    }).catch(err => {
        res.status(400).json({
            ok: false,
            message : 'Error user exp updated',
            errors : err
        })
    });
}


// Handle update user password
exports.password = function (req, res) {
    userRepository.changePassword(req.body.id,req.body.password).then(user => {
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


// PROP: Returns the corresponding user to the mail that arrives by parameter.
exports.search = function (req, res) {
    userRepository.search(req.query.query)
        .then( users => {
            res.status(200).json({
                ok:true,
                message: 'User found!',
                data: users
            });
        }).catch(err => {
        res.status(404).json({
            ok:false,
            message: 'Error finding user!',
            err
        });
    });
};

exports.friends = (req, res) => {
    userRepository.friends(req.query.mail)
        .then(users => {
            res.status(200).json({
                ok : true,
                message: 'friends found!',
                data: users
            });
        }).catch(err => {
        res.status(412).json({
            ok: false,
            message: 'Error load friends!',
            err
        });
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





