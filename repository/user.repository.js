let User = require('../model/userModel');


exports.findAll = () => {
    return User.find({ }, '').populate('pets');
}