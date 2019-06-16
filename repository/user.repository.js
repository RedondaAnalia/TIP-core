
const User = require('../model/userModel');
const petRepository = require ('../repository/pet.repositoty');
const levelRepository = require ('../repository/level.repository');
const bcrypt= require('bcryptjs');
const friendshipService = require('../services/friendshipService');


exports.findAll = () => {
    return User.find({ }, '').populate('pets');
};

exports.countAll = () => {
  return User.count({});
};

exports.new = (u) => {

  return friendshipService.newSocialUser(u.email).then(()=>{
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
  })
};

exports.findById = (id) => {
  return User.findById(id);
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


exports.changePassword = (id, password) => {
  return User.findOneAndUpdate({_id: id}, {$set: {password:bcrypt.hashSync(password, 10)}}, {new: true})
};

exports.addExperience = (mail, exp) => {
  return this.findByEmail(mail).then(user => {
    user.experience += exp;
    return levelRepository.findByExp(user.experience).then(level => {
        if(user.level < level[0].level){
          user.level = level[0].level
        }
      return user.save()
      })
    })
  };

exports.findByEmail = (email) => {
  return User.findOne({email}).populate('pets applications milestones');
};

exports.addPet= (user_id,pet) => {
  return petRepository.new(pet).then((res)=>
  User.findOneAndUpdate({_id: user_id}, {$addToSet: {pets: res}},{new:true}).populate('pets applications milestones'))
  };

exports.updateImage = (user_id, image) => {
  return User.findOneAndUpdate({_id: user_id}, {$set: {'image':image}},{new:true})
      .populate('pets applications milestones')
};




exports.addMilestone= (milestone, user) => {
  return this.addExperience(user,milestone.points).then(user =>{
    return User.findOneAndUpdate({email: user},
        {$addToSet: {milestones: milestone}},
        {new:true})
        .populate('pets applications milestones')
        .then(() => {return milestone})

  })

//     { $set: { <field1>: <value1>, ... }, $push: { <field>: <value>, ..} }
};

exports.search = (query) => {
  const regex = new RegExp( query, 'i' );
  return new Promise((resolve, reject) => {
    User.find({}, {name:true, email:true, image:true,_id:false, phone:true})
        .or([{ 'name': regex }, { 'email': regex }, { 'phone': regex }])
        .exec((err,users) => {
          if(err){
            reject('Error al buscar usuarios', err);
          }else{
            resolve(users)
          }
        })

  })
};


exports.searchFriends = (user, query) => {
  const regex = new RegExp( query, 'i' );
  return new Promise((resolve, reject) => {
    User.find({}, {name:true, email:true, image:true,_id:false, phone:true})
        .or([{ 'name': regex }, { 'email': regex }, { 'phone': regex }])
        .exec((err,users) => {
          if(err){
            reject('Error al buscar usuarios', err);
          }else{
            resolve(this.compareWithFriends(user, users))
          }
        })

  })
};




exports.compareWithFriends = (user, users) =>{
  return friendshipService.friends(user).then((friends)=>{
    return Promise.all(users.map((u) => {
      u.friend = friends.relation.includes(u.email)
    }))
  })
}
exports.friends = (mail) =>  {
  return friendshipService.friends(mail).then((friends)=>{
    return Promise.all(friends.relation.map((email) => User.find({email}, 'name email image')))
  })
};