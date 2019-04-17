
const Vaccine = require('../model/vaccineModel');

exports.new = function (vac) {
  return new Vaccine({
    name : vac.name,
    code : vac.code,
  }).save();
};

exports.findById = (vaccine_id) => {
  return Vaccine.findById(vaccine_id);
};

exports.findAll = () => {
  return Vaccine.find();
};

exports.countAll = () => {
  return Vaccine.count({});
};

exports.update = (vac) => {
  this.findById(vac._id).then((data) => {
    data.name = vac.name ? vac.name : data.name;
    data.code = vac.code ? vac.code : data.code;
  });
};

exports.delete = (_id) => {
  return Vaccine.remove(_id);
};