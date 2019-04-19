// userController.js
// Import user model

const userRepository = require('../repository/user.repository');

// Handle index actions
exports.index = function (req, res) {
    userRepository.findAll().exec( (err, users) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error buscando usuarios',
                errors: err
            });
        }
        userRepository.countAll().then( conteo =>
        res.status(200).json({
            ok: true,
            users: users,
            total: conteo
        }));
    });
};
// Handle create user actions
exports.new = function (req, res) {

  userRepository.new(req.body).then(user => {
    user.password = ':)'
    res.json({
      ok : true,
      message: 'New user created!',
      data: user
    });
  }).catch( err =>{
    res.status(412).json({
      ok: false,
      message: 'New user create failed!',
      data: err
    });
  })
}

// Handle view user info
exports.view = function (req, res) {

  userRepository.findByEmail(req.params.email).exec((err, user) => {
    if (err)
      res.send(err);
    res.json({
      message: 'User details loading..',
      data: user
    });
  });
};

exports.findById = function (req, res) {
  userRepository.findById(req.params.user_id, (err, user) => {
    if (err)
      res.send(err);
    res.json({
      message: 'User details loading..',
      data: user

    });
  });
}

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
  userRepository.addPet(req.body.user_id,req.body.pet).then(user => {
    user.password = ':)'
    res.status(200).json({
      ok:true,
      user
    });
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