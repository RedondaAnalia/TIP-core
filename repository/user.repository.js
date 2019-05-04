const User = require('../model/userModel');
const petRepository = require ('../repository/pet.repositoty');
var bcrypt= require('bcryptjs');


exports.findAll = () => {
    return User.find({ }, '').populate('pets');
}

exports.countAll = () => {
  return User.count({});
};

exports.new = (u) => {
  return new User({
    name : u.name,
    img : u.img,
    role : u.role,
    google : u.google,
    gender : u.gender,
    email : u.email,
    password: bcrypt.hashSync(u.password, 10),
    phone : u.phone
  }).save();
};

exports.findById = (id) => {
  return User.findById({_id:id});
};

exports.update = (u) => {
  this.findByEmail(u.email).then((user) => {
    console.log(user);
    if (!user)
      return null;
    user.name = u.name ? u.name : user.name;
    user.gender = u.gender ? u.gender : user.gender;
    user.password = u.password ? bcrypt.hashSync(u.password, 10) : user.password
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
  return petRepository.new(pet)
                      .then((res)=>
                            User.findOneAndUpdate({_id: user_id}, {$addToSet: {pets: res}}
                      )).catch(err => err);
};

