
const MedicalCard = require('../model/medicalCardModel');

exports.new = function (mc) {
  return new MedicalCard({
    title : mc.title,
    diagnostic : mc.diagnostic,
    number : mc.number,
    veterinary : mc.veterinary,
    code : mc.code,
  }).save();
};

exports.findById = (diagnostic_id) => {
  return MedicalCard.findById(diagnostic_id);
};

exports.findAll = () => {
  return MedicalCard.find();
};

exports.countAll = () => {
  return MedicalCard.count({});
};

exports.update = (mc) => {
  this.findById(vac._id).then((data) => {
    data.title = mc.title ? mc.title : data.title;
    data.diagnostic = mc.diagnostic ? mc.diagnostic : data.diagnostic;
    return data.save()
  });
};

exports.delete = (_id) => {
  return MedicalCard.remove(_id);
};