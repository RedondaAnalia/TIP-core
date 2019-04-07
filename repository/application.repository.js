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

exports.update = function (req) {
    Application.findById(req.body.application_id, function (err, application) {
        if (err)
            return reject(err)
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
            // save the pet and check for errors
            application.save()
        });
    });
};

// Handle index actions
exports.findAll = function () {
    return Application.find({})
};

exports.countAll = function () {
    return Application.count({})
}