// applicationController.js
// Import application model
let Application = require('../model/applicationModel');
let Vaccine = require('../model/vaccineModel');
// Handle create pet actions
exports.new = function (newApplication) {
    return new Promise ((resolve,reject) => {
    Vaccine.findById(newApplication.vaccine_id, function (err, vaccine) {
        if (err)
            return reject(err)
        
        var application = new Application({
            vaccine : vaccine._id,
            code : newApplication.code,
            img : newApplication.img,
            estimated_date : newApplication.estimated_date,
            application_date : newApplication.application_date,
            create_date : newApplication.create_date
        });

            application.save(function (err, application) {
                if (err)
                    return reject(err)
                return resolve(application);
            });
        });
    })
};