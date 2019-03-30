// petController.js
// Import pet model
Pet = require('../model/petModel');
// Handle index actions
exports.index = function (req, res) {
    Pet.get(function (err, pet) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Pets retrieved successfully",
            data: pet
        });
    });
};
// Handle create pet actions
exports.new = function (req, res) {
    var pet = new Pet();
    pet.name = req.body.name ? req.body.name : pet.name;
    pet.gender = req.body.gender;
    pet.date_of_birth = req.body.date_of_birth;
    pet.castrate = req.body.castrate;
    pet.vaccines = [];
    pet.code = req.body.code;
    pet.milestones = [];
    pet.medical_story = [];
    pet.experience = 0;
    pet.level = 0;
// save the pet and check for errors
    pet.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New pet created!',
            data: pet
        });
    });
};
// Handle view pet info
exports.view = function (req, res) {
    Pet.findById(req.params.pet_id, function (err, pet) {
        if (err)
            res.send(err);
        res.json({
            message: 'Pet details loading..',
            data: pet
        });
    });
};
// Handle update pet info
exports.update = function (req, res) {
Pet.findById(req.params.pet_id, function (err, pet) {
        if (err)
            res.send(err);
        pet.name = req.body.name ? req.body.name : pet.name;
        pet.gender = req.body.gender;
        pet.date_of_birth = req.body.date_of_birth;
        pet.castrate = req.body.castrate;
        pet.code = req.body.code;
        pet.experience = req.body.experience;
        pet.level = req.body.level;
        
// save the pet and check for errors
        pet.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Pet Info updated',
                data: pet
            });
        });
    });
};
// Handle delete pet
exports.delete = function (req, res) {
    Pet.remove({
        _id: req.params.pet_id
    }, function (err, pet) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Pet deleted'
        });
    });
};