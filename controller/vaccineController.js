// vaccineController.js
// Import vaccine model
let VaccineREpository = require('../repository/vaccine.repository');

// Handle index actions
exports.index = function (req, res) {
    VaccineREpository.find({ }).exec( (err, vaccines) => {
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
    VaccineREpository.new(req.body).then(data => 
    res.status(200).json({
        ok:true,
        vaccine : data
    })).catch(err => 
        res.status(400).json({
            ok: false,
            errors : err
        })
    );
    
};
// Handle view vaccine info
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