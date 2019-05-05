// applicationController.js
// Import application model
const Application = require('../model/applicationModel');
const Vaccine = require('../model/vaccineModel');
// Handle create pet actions
exports.new = function (newApplication) {
  return Vaccine.findOne({_id:newApplication.vaccine_id})
                .then(vaccine => {
                  if (!vaccine){
                   //ERROR RETORNO 
                  }
                  return new Application({
                    vaccine,
                    code: newApplication.code,
                    img: newApplication.img,
                    estimated_date: newApplication.estimated_date,
                    application_date: newApplication.application_date,
                    create_date: newApplication.create_date
                  }).save();  
                }).catch(err => err)
};


//MAS ESPECIFICO.
exports.update = function (req) {
  return Application.findById(req.body.application_id, (err, application) => {
    if (err)
      return err;
    application.code = req.body.code? req.body.code : application.code;
    application.img = req.body.img? req.body.img : application.img;
    application.estimated_date = req.body.estimated_date? req.body.estimated_date:application.estimated_date;
    application.application_date = req.body.application_date;

    // save the pet and check for errors
    return application.save();
  });
};


// Handle index actions
exports.findAll = function () {
  return Application.find({});
};

exports.countAll = function () {
  return Application.count({});
};