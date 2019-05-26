
const Level = require('../model/levelModel');


exports.findByExp = (exp) => {
    return Level.find({
        $and: [
            { $or: [{min_exp: null}, {min_exp: {$lte : exp}}] },
            { $or: [{max_exp: null}, {max_exp: {$gte : exp}}] }
        ]
    })
};
