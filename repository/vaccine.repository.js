
let Vaccine = require('../model/vaccineModel');

exports.new = function (vac) {
var vaccine = new Vaccine();
    vaccine.name = vac.name;
    vaccine.code = vac.code;
// save the vacinne and check for errors
    return vaccine.save();
}

exports.findById = function (vaccine_id) {
    return Vaccine.findById(vaccine_id)
}