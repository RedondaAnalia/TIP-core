// applicationController.js
// Import application model
let Application = require('../model/applicationModel');

// Handle create pet actions
exports.new = function (newApplication) {
    var application = new Application({
        vaccine : newApplication.vaccine_id,
        code : newApplication.code,
        img : newApplication.img,
        estimated_date : newApplication.estimated_date,
        application_date : newApplication.application_date,
        create_date : newApplication.create_date
    });

// save the pet and check for errors
    return new Promise ((resolve,reject) => {
        newApplication.save(function (err, application) {
            if (err)
                return reject(err)
            return resolve(application);
        });
    });
};