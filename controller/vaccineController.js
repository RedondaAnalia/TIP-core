// vaccineController.js
// Import vaccine model
let Vaccine = require('../model/vaccineModel');

// Handle index actions
exports.index = function (req, res) {
    Vaccine.find({ }).exec( (err, vaccines) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error buscando vacunas',
                errors: err
            });
        }
        Vaccine.count({}, (error,conteo) =>
        res.status(200).json({
            ok: true,
            vaccines: vaccines,
            total: conteo
        }));
    });
};
// Handle create vaccine actions
exports.new = function (req, res) {
    var vaccine = new Vaccine();
    vaccine.name = req.body.name ? req.body.name : vaccine.name;
    vaccine.code = req.body.code;
// save the vacinne and check for errors
    vaccine.save(function (err, vaccine) {
         if (err)
             return res.json(err);
        res.json({
            message: 'New vaccine created!',
            data: vaccine
        });
    });
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, vaccine) {
        if (err)
            res.send(err);
        res.json({
            message: 'Vaccine details loading..',
            data: vaccine
        });
    });
};
// Handle update vaccine info
exports.update = function (req, res) {
User.findById(req.params.vaccine_id, function (err, vaccine) {
        if (err)
            res.send(err);
vaccine.name = req.body.name ? req.body.name : vaccine.name;
        vaccine.code = req.body.code;
// save the vaccine and check for errors
        vaccine.save(function (err, vaccine) {
            if (err)
                return res.json(err);
            res.json({
                message: 'Vaccine Info updated',
                data: vaccine
            });
        });
    });
};

// Handle delete vaccine
exports.delete = function (req, res) {
    Vaccine.remove({
        _id: req.params.vaccine_id
    }, function (err, vaccine) {
        if (err)
            res.send(err);
    res.json({
            status: "success",
            message: 'Vaccine deleted'
        });
    });
};