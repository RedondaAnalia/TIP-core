// userController.js
// Import user model
let User = require('../model/userModel');
let userRepository = require('../repository/user.repository')
let petRepository = require('../repository/pet.repositoty')
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
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.phone = req.body.phone;
// save the user and check for errors
    user.save(function (err) {
         if (err)
             return res.json(err);
        res.json({
            message: 'New user created!',
            data: user
        });
    });
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
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
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
user.name = req.body.name ? req.body.name : user.name;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.phone = req.body.phone;
// save the user and check for errors
        user.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};

exports.newPet = (req, res) => {
    User.findById(req.body.user_id, (err, user) => {
        if (err)
            return res.status(500).json({
                ok: false,
                error: err,
                message: 'error buscando al usuario'
            });
        if (!user){
            return res.status(401).json({
                ok: false,
                error: err,
                message: 'no existe usuario con ese ID: ' + req.body.user_id
                });
            }   
            petRepository.new(req.body.pet).then((pet) =>{
            user.pets.push(pet)
            user.save( (err, user) =>{
                if(err)
                    return res.status(400).json({
                        ok:false,
                        message: 'error al agregar mascota',
                        errors: err
                    })
                return res.status(200).json({
                    ok:true,
                    user: user
                })
            });
            
        }
    );
})
}

// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};