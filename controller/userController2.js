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
    userRepository.findByEmail(req.params.email).exec( function (err, user) {
      if (err)
          res.send(err);
      res.json({
          message: 'User details loading..',
          data: user
      });
      
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