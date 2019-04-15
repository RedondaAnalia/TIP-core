const User = require('../model/userModel');

exports.findAll = () => {
  return User.find({ }, '').populate('pets');
};

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
  return User.findById(id);
};

exports.update = (u) => {
  this.findById(u._id).then((user) => {
    if (!user)
      return null;
    user.name = u.name ? u.name : user.name;
    user.gender = u.gender ? u.gender : user.gender;
    user.email = u.email ? u.email : user.email;
    user.phone = u.phone ? u.phone : user.phone;
    // save the user and check for errors
    return user.save();
  }).catch((err) => {
    return err;
  });
};