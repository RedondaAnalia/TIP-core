const Pet = require('../model/petModel');

exports.new = function (p) {
  return new Pet({
    name : p.name,
    gender : p.gender,
    date_of_birth : p.date_of_birth,
    castrate : p.castrate,
    vaccines : [],
    species : p.species,
    breed : p.breed,
    code : p.code,
    milestones : [],
    medical_story : [],
  }).save();
};

exports.findById = function (id) {
  return Pet.findById(id).populate({ 
    path: 'applications',
    populate: {
      path: 'vaccine',
      model: 'Vaccine'
    } 
  });
};

exports.update = function (p) {
  this.findById(p._id).then(data => {
    if (data == null) {
      return null;
    }
    data.name = p.name;
    data.gender = p.gender;
    data.date_of_birth = p.date_of_birth;
    data.castrate = p.castrate;
    data.code = p.code;
    data.experience = p.experience;
    data.level = p.level;
    return p.update();
  }).catch(err => {
    return err;
  });
};

exports.remove = function (pet_id) {
  return pet.remove(pet_id);
};

exports.findAll = () => {
  return Pet.find({ }, '').populate({ 
    path: 'applications',
    populate: {
      path: 'vaccine',
      model: 'Vaccine'
    } 
  });
};

exports.addApplication = ((p, a) => {
  p.applications.push(a);
  return p.save();
});

exports.getTotal = () => {
  return Pet.count({});
}; 