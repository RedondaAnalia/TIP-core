// veterinaryController.js
// Import veterinary model
Veterinary = require('../model/veterinaryModel');
// Handle index actions
exports.index = function (req, res) {
    Veterinary.get(function (err, veterinary) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Veterinaries retrieved successfully",
            data: veterinary
        });
    });
};
// Handle create veterinary actions
exports.new = function (req, res) {
    var veterinary = new Veterinary();
    veterinary.name = req.body.name ? req.body.name : veterinary.name;
    veterinary.email = req.body.email;
    veterinary.phone = req.body.phone;
    veterinary.experience = 0;
    veterinary.level = 0;
// save the veterinary and check for errors
    veterinary.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New veterinary created!',
            data: veterinary
        });
    });
};
// Handle view veterinary info
exports.view = function (req, res) {
    Veterinary.findById(req.params.veterinary_id, function (err, veterinary) {
        if (err)
            res.send(err);
        res.json({
            message: 'Veterinary details loading..',
            data: veterinary
        });
    });
};
// Handle update user info
exports.update = function (req, res) {
Veterinary.findById(req.params.veterinary_id, function (err, veterinary) {
        if (err)
            res.send(err);
        veterinary.name = req.body.name ? req.body.name : veterinary.name;
        veterinary.gender = req.body.gender;
        veterinary.email = req.body.email;
        veterinary.phone = req.body.phone;
// save the veterinary and check for errors
            veterinary.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Veterinary Info updated',
                data: veterinary
            });
        });
    });
};
// Handle delete veterinary
exports.delete = function (req, res) {
    Veterinary.remove({
        _id: req.params.veterinary_id
    }, function (err, veterinary) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Veterinary deleted'
        });
    });
};