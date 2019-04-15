let User = require('../model/userModel');


exports.findAll = () => {
    return User.find({ }, '').populate('pets');
}

exports.countAll = () => {
    return User.count({})
}