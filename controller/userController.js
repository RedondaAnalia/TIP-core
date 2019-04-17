// userController.js
// Import user model
const userRepository = require('../repository/user.repository');
// Handle index actions
exports.index = function (req, res) {
  userRepository.findAll().exec((err, users) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: 'Error buscando usuarios',
        errors: err
      });
    }
    userRepository.countAll().then(conteo =>
      res.status(200).json({
        ok: true,
        users,
        total: conteo
      }));
  });
};
// Handle create user actions
exports.new = function (req, res) {
  userRepository.new(req.body).then(user => {
    res.json({
      message: 'New user created!',
      data: user
    });
  }
  ).catch(err =>
    res.status(400).json({
      ok: false,
      message: 'error al crear un usuario',
      errors : err
    })
          
  );
};
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
};

// Handle update user info
exports.update = function (req, res) {
  userRepository.update(res.body).then(user => {
    if (user == null) {
      return res.status(400).json({
        ok:false,
        message: ` el usuario con el id${  req.body._id  }no existe`,
        errors: { message: ' No existe un usuario con ese ID'}
      });
    }
    res.status(200).json({
      ok:true,
      user
    }
    );
  }).catch(err => 
    res.status(400).json({
      ok: false,
      message : 'Error al buscar mascota',
      errors : err
    })
  );
};

exports.newPet = (req, res) => {
  userRepository.addPet(req.body.user_id,req.body.pet).then(user => {
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