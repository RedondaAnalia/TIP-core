
const User = require('../model/userModel');
const petRepository = require ('../repository/pet.repositoty');


exports.findAll = () => {
    return User.find({ }, '').populate('pets');
}

exports.countAll = () => {
  return User.count({});
};

exports.new = (u) => {
  return new User({
    name : u.name,
    gender : u.gender,
    email : u.email,
    phone : u.phone
  }).save();
};

exports.findById = (id) => {
  return User.findById({id});
};

exports.update = (u) => {
  this.findById(u._id).then((user) => {
    console.log(user);
    if (!user)
      return null;
    user.name = u.name ? u.name : user.name;
    user.gender = u.gender ? u.gender : user.gender;
    user.email = u.email ? u.email : user.email;
    user.phone = u.phone ? u.phone : user.phone;
    user.pets = u.pets ? u.pets : user.pets;
    // save the user and check for errors
    return user.save();
  }).catch((err) => {
    return err;
  });
};

exports.findByEmail = (email) => {
  return User.findOne({email}).populate('pets');
};

exports.addPet= (user_id,pet) => {
  let userFound;
  return this.findById(user_id)
    .then((user) => {
      if (!user) {
        const err = new Error('User Exception: User not found');
        throw err;
      }
      userFound=user;
      return petRepository.new(pet);
    })
    .then(pet => {
      userFound.pets.push(pet);
    })
    .then(() => {
      return User.update(userFound);
    });
};

