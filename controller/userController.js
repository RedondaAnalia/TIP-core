// userController.js
// Import user model
const userRepository = require('../repository/user.repository');
const petRepository = require('../repository/pet.repositoty');
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
  userRepository.new(req).then(user => {
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
  User.findById(req.body.user_id, (err, user) => {
    if (err)
      return res.status(500).json({
        ok: false,
        error: err,
        message: 'error buscando al usuario'
      });
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: err,
        message: `no existe usuario con ese ID: ${  req.body.user_id}`
      });
    }   
    petRepository.new(req.body.pet).then((pet) => {
      user.pets.push(pet);
      user.save((err, user) => {
        if (err)
          return res.status(400).json({
            ok:false,
            message: 'error al agregar mascota',
            errors: err
          });
        return res.status(200).json({
          ok:true,
          user
        });
      });
    }
    );
  });
};

// Handle delete user
exports.delete = function (req, res) {
  User.remove({
    _id: req.params.user_id
  }, (err, user) => {
    if (err)
      res.send(err);
    res.json({
      status: 'success',
      message: 'User deleted'
    });
  });
};