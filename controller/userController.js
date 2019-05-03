
const userRepository = require('../repository/user.repository');

// PROP: Returns all users in the DB.
exports.index = function (req, res) {
    userRepository.findAll()
                  .then(users => {
                              users= users.map(user=> {user.password=':)'; return user});
                              res.status(200).json({
                                ok: true,
                                message: 'Users found!',
                                users: users
                              })
                  }).catch(err =>{
                                res.status(500).json({
                                  ok: false,
                                  message: 'Error finding users!',
                                  err
                                })
                  });
};


// PROP: Creates a new user in the DB
exports.new = function (req, res) {
    userRepository.new(req.body)
                  .then(user => {
                              user.password = ':)'
                              res.status(200).json({
                                ok : true,
                                message: 'New user created!',
                                data: user
                              });
                  }).catch(err =>{
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
                            user.password= ':)';
                            res.status(200).json({
                              ok:true,
                              message: 'User found!',
                              data: user
                            });
                }).catch(err=>{
                            res.status(404).json({
                              ok:false,
                              message: 'Error finding user',
                              err
                          });
                });
};


//CREO QUE NO SE ESTA USANDO. VERIFICAR. SI SE ESTA USANDO, REFACTOREAR. SINO BORRAR.
//PROP: Returns the corresponding user to the ID that arrives by parameter
exports.findById = function (req, res) {
  userRepository.findById(req.params.user_id, (err, user) => {
    if (err)
      res.send(err);
    user.password=':)';
    res.json({
      message: 'User details loading..',
      data: user
    });
  });
}

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
  user.password = ':)';
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

exports.newPet = (req, res) => {
  userRepository.addPet(req.body.user_id,req.body.pet)
                .then(user => {
                            user.removeAttribute(password);
                            res.status(200).json({
                                            ok:true,
                                            user
                            });
                }).catch(err =>{
                            return res.status(412).json({
                              ok:false,
                              message: 'Error al '
                            })
                });
};

// Handle delete user
exports.delete = function (req, res) {
  userRepository.remove(req.params.user_id).then(() => {
    res.status(200).json({
      ok:true,
      message: 'user deleted'
    });
  }).catch(err => 
    res.status(400).json({
      ok: false,
      message : 'Error al eliminar el usuario',
      errors : err
    })
  );
};