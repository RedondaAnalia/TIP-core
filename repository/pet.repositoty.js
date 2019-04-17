Pet = require('../model/petModel');

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
}

exports.findById = function (id) {
    return Pet.findById(id).populate({ 
        path: 'applications',
        populate: {
          path: 'vaccine',
          model: 'Vaccine'
        } 
     });
     
}

exports.update = function (p) {
    findById(body.pet_id).then(data => {
        if(data == null){
             return null
        }
        pet.name = p.name;
        pet.gender = p.gender;
        pet.date_of_birth = p.date_of_birth;
        pet.castrate = p.castrate;
        pet.code = p.code;
        pet.experience = p.experience;
        pet.level = p.level;
        return p.update();
    }).catch(err => {
        return reject(err);
    });
}

exports.remove = function (pet_id) {
  return Pet.remove(pet_id);
};


exports.findAll = () => {
    return Pet.find({ }, '').populate({ 
        path: 'applications',
        populate: {
          path: 'vaccine',
          model: 'Vaccine'
        } 
     })
    }

exports.addApplication = ((p, a) => {
    p.applications.push(a)
    return p.save()
});

exports.getTotal = () => {
    return Pet.count({})
} 