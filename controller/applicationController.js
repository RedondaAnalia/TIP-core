// applicationController.js
// Import application model
let Application = require('../model/applicationModel');
let Vaccine = require('../model/vaccineModel');
// Handle create pet actions
exports.new = function (newApplication) {
    return new Promise((resolve, reject) => {
        Vaccine.findById(newApplication.vaccine_id, function (err, vaccine) {
            if (err)
                return reject(err)
            if (vaccine == null){
                //TODO FIXME GENERAR EL ERROR DE RETORNO
            }
            
                var application = new Application({
                    vaccine: vaccine,
                    code: newApplication.code,
                    img: newApplication.img,
                    estimated_date: newApplication.estimated_date,
                    application_date: newApplication.application_date,
                    create_date: newApplication.create_date
                });

            application.save(function (err, application) {
                if (err)
                    return reject(err)
                return resolve(application);
            });
        });
    })
};

exports.update = function (req, res) {
    Application.findById(req.body.application_id, function (err, application) {
        if (err)
            return res.send(err);
            Vaccine.findById(req.body.vaccine_id, function (err, vaccine) {
                if (err)
                    return reject(err)
                if (vaccine == null){
                    //TODO FIXME GENERAR EL ERROR DE RETORNO
                }
            application.vaccine = vaccine;
            application.code = req.body.code;
            application.img = req.body.img;
            application.estimated_date = req.body.estimated_date;
            application.application_date = req.body.application_date;

            // save the pet and check for errors
            application.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Application Info updated',
                    data: application
                });
            });
        });
    });
};

// Handle index actions
exports.index = function (req, res) {
    Application.find({}).exec((err, applications) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error buscando aplicaciones',
                errors: err
            });
        }
        Application.count({}, (error, conteo) =>
            res.status(200).json({
                ok: true,
                aplications: applications,
                total: conteo
            }));
    });
};